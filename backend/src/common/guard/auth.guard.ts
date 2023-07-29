import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { IAuthToken } from 'src/auth/type/auth.type';
import { CustomLoggerService } from '@common/log/logger.service';

export class AuthGuard implements CanActivate {
  constructor(
    @Inject(CustomLoggerService) private readonly logger: CustomLoggerService,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest() as Request;
    const token = request.cookies['AT'] as string;
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = (await this.authService.tokenVerify(token)) as IAuthToken;

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
