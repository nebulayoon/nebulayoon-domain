import {
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { IRefreshToken } from 'src/auth/type/auth.type';
import { JwtService } from '@nestjs/jwt';
import { RedisRepository } from '@database/redis/redis';

interface IRefreshTokenPayload extends IRefreshToken {
  iat: number;
  exp: number;
}

export class RefreshGuard implements CanActivate {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(RedisRepository) private readonly redisRepository: RedisRepository,
  ) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest() as Request;
    const refreshToken = request.cookies['RT'] as string;

    try {
      const payload = this.jwtService.verify(
        refreshToken,
      ) as IRefreshTokenPayload;
      console.log(payload);

      request['user'] = payload;

      return payload.id !== undefined;
    } catch (e: any) {
      switch (e.name) {
        case 'JsonWebTokenError':
          throw new HttpException('유효하지 않은 토큰입니다.', 401);

        case 'TokenExpiredError':
          throw new HttpException('토큰이 만료되었습니다.', 400);

        default:
          logger.error('[Default Token Error]', e.stack, e.context);
          throw new HttpException('서버 오류', 500);
      }
    }
  }
}
