import {
  CanActivate,
  ExecutionContext,
  Inject,
  HttpException,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { Request } from 'express';
import { IRefreshToken } from '../../auth/types/auth.type';
import { RedisRepository } from '../../database/redis/redis';
import { CustomLoggerService } from '@libs/common/log/logger.service';

export class RefreshGuard implements CanActivate {
  constructor(
    @Inject(RedisRepository) private readonly redisRepository: RedisRepository,
    @Inject(CustomLoggerService) private readonly logger: CustomLoggerService,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest() as Request;
    const refreshToken = request.cookies['RT'] as string;

    try {
      const payload = (await this.authService.tokenVerify(
        refreshToken,
      )) as IRefreshToken;

      request['user'] = payload;

      return payload.id !== undefined;
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
