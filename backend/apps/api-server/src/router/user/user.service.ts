import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EntityService } from '../../database/main.service';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { AuthService } from '../../auth/auth.service';
import {
  IAuthToken,
  IEmailVerifyToken,
  IRefreshToken,
} from '../../auth/types/auth.type';
import { compare, hash } from 'bcrypt';
import { v4 } from 'uuid';
import { RedisRepository } from '../../database/redis/redis';
import { CustomLoggerService } from '@libs/common/log/logger.service';
import { UserEntity } from '@libs/database/entity';
import { Tokens } from './types/tokens.type';
import { MailService } from '../../mail/mail.service';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class UserService {
  constructor(
    @Inject(EntityService) private readonly entityService: EntityService,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(RedisRepository) private readonly redisRepository: RedisRepository,
    @Inject(CustomLoggerService) private readonly logger: CustomLoggerService,
    @Inject(MailService) private readonly mailService: MailService,
  ) {}

  private async getUserByEmail(email: string): Promise<UserEntity | null> {
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

  async register(registerDto: RegisterDto): Promise<UserEntity> {
    const hashedPassword = await hash(registerDto.password, 10);

    await this.validateDuplicateUser(registerDto.email);

    try {
      this.sendEmailVerify(registerDto.email).then(() =>
        this.logger.verbose(`[메일 전송 완료] server -> ${registerDto.email}`),
      );
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

  async login(loginDto: LoginDto): Promise<Tokens> {
    const user = await this.getUserByEmail(loginDto.email);
    if (!user) {
      throw new HttpException('잘못된 인증 정보입니다.', 400);
    }

    if (!user.emailVerify) {
      throw new HttpException('이메일 인증이 필요합니다.', 401);
    }

    const validatePassword = await compare(loginDto.password, user.password);
    if (!validatePassword) {
      throw new HttpException('잘못된 인증 정보입니다.', 400);
    }

    const atData: IAuthToken = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const rtData: IRefreshToken = {
      id: user.id,
      name: user.name,
      email: user.email,
      uuid: v4(),
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.authService.getAccessToken(atData),
      this.authService.getRefreshToken(rtData),
    ]);

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

  async newAuthToken(refreshToken: string, user: IAuthToken): Promise<string> {
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
      name: user.name,
      email: user.email,
    };
    const accessToken = await this.authService.getAccessToken(atData);

    return accessToken;
  }

  async validateMultiUser(userId: string): Promise<boolean> {
    const cacheHit = await this.redisRepository.get(userId);
    return cacheHit ? true : false;
  }

  async logout(userId: number): Promise<void> {
    await this.redisRepository.del(userId.toString());
  }

  async sendEmailVerify(
    emailAddress: string,
  ): Promise<SMTPTransport.SentMessageInfo> {
    const emailVerifyData: IEmailVerifyToken = {
      email: emailAddress,
    };

    const token = await this.authService.getEmailVerifyToken(emailVerifyData);

    return await this.mailService.sendMemberJoinVerification(
      emailAddress,
      token,
    );
  }

  async validateEmail(token: string) {
    try {
      const payload = (await this.authService.tokenVerify(
        token,
      )) as IEmailVerifyToken;

      return await this.entityService.user.emailVerifyUpdate(payload.email);
    } catch (e: any) {
      switch (e.name) {
        case 'JsonWebTokenError':
          throw new HttpException('유효하지 않은 토큰입니다.', 401);

        case 'TokenExpiredError':
          throw new HttpException('토큰이 만료되었습니다.', 400);

        default:
          this.logger.error('[Default Token Error]', e.stack, e.context);
          throw new HttpException('서버 오류', 500);
      }
    }
  }
}
