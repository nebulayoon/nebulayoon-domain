import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  IAuthToken,
  IEmailVerifyToken,
  IRefreshToken,
  TTokenCase,
} from './types/auth.type';
import { RedisRepository } from '../database/redis/redis';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(RedisRepository) private readonly redisRepository: RedisRepository,
  ) {}

  async getAccessToken(atData: IAuthToken) {
    return this.jwtService.signAsync(atData);
  }

  async getRefreshToken(rtData: IRefreshToken) {
    return this.jwtService.signAsync(rtData, { expiresIn: '30d' });
  }

  async getEmailVerifyToken(evtData: IEmailVerifyToken) {
    return this.jwtService.signAsync(evtData, { expiresIn: '1h' });
  }

  async tokenVerify(token: string): Promise<TTokenCase> {
    return this.jwtService.verify(token);
  }

  async newAccessToken(refreshToken: string, user: IAuthToken) {
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

    return this.getAccessToken(atData);
  }
}
