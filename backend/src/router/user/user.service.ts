import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EntityService } from 'src/database/main.service';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';
import { IAuthToken, IRefreshToken } from 'src/auth/type/auth.type';
import { compare, hash } from 'bcrypt';
import { v4 } from 'uuid';
import { RedisRepository } from '@database/redis/redis';
import { CustomLoggerService } from '@common/log/logger.service';
import { User } from '@database/entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(EntityService) private readonly entityService: EntityService,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(RedisRepository) private readonly redisRepository: RedisRepository,
    @Inject(CustomLoggerService) private readonly logger: CustomLoggerService,
  ) {}

  private async getUserByEmail(email: string): Promise<User> {
    const user = await (async () => {
      try {
        return await this.entityService.user.findUser({
          email,
        });
      } catch (e: any) {
        this.logger.error(
          '[UserService->login] findUser 실패',
          e.stack,
          e.context,
        );
        return undefined;
      }
    })();

    if (user === undefined) {
      throw new HttpException(
        '잘못된 인증 정보입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  private async validateDuplicateUser(email: string): Promise<void> {
    const user = await this.getUserByEmail(email);

    if (user) {
      throw new HttpException(
        '이미 존재하는 유저입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await hash(registerDto.password, 10);

    await this.validateDuplicateUser(registerDto.email);

    try {
      return await this.entityService.user.create({
        ...registerDto,
        password: hashedPassword,
      });
    } catch (e: any) {
      this.logger.error(
        '[UserService->register] create 실패',
        e.stack,
        e.context,
      );
      return undefined;
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.getUserByEmail(loginDto.email);

    const validatePassword = await compare(loginDto.password, user.password);
    if (!validatePassword) {
      return undefined;
    }

    const atData: IAuthToken = {
      id: user.id,
    };

    const rtData: IRefreshToken = {
      id: user.id,
      uuid: v4(),
    };

    const accessToken = await this.authService.getAccessToken(atData);
    const refreshToken = await this.authService.getRefreshToken(rtData);

    try {
      await this.redisRepository.set(user.id.toString(), refreshToken);
    } catch (e: any) {
      this.logger.error(
        '[UserService->login] Redis Set 실패',
        e.stack,
        e.context,
      );
      return undefined;
    }

    return { accessToken, refreshToken };
  }

  async newAuthToken(refreshToken: string, user: IAuthToken) {
    const storedRefreshToken = await (async () => {
      try {
        return await this.redisRepository.get(user.id.toString());
      } catch (e) {
        return undefined;
      }
    })();

    if (!storedRefreshToken) {
      return undefined;
    }

    if (refreshToken !== storedRefreshToken) {
      return undefined;
    }

    const atData: IAuthToken = {
      id: user.id,
    };
    const accessToken = await this.authService.getAccessToken(atData);

    return accessToken;
  }
}
