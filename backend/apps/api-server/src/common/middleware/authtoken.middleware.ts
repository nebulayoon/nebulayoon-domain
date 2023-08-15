import {
  HttpException,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../../auth/auth.service';
import { CustomLoggerService } from '@libs/common/log/logger.service';
import { IAuthToken } from '../../auth/types/auth.type';

@Injectable()
export class AuthTokenMiddleware implements NestMiddleware {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(CustomLoggerService) private readonly logger: CustomLoggerService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies['AT'] as string;
    const refreshToken = req.cookies['RT'] as string;

    let payload: IAuthToken;
    try {
      payload = (await this.authService.tokenVerify(accessToken)) as IAuthToken;
    } catch (e: any) {
      switch (e.name) {
        case 'JsonWebTokenError':
          throw new HttpException('유효하지 않은 토큰입니다.', 401);

        case 'TokenExpiredError':
          // refresh token check도 진행
          const newAccessToken = await this.authService.newAccessToken(
            refreshToken,
            payload,
          );

          res.on('finish', () => {
            res.cookie('AT', newAccessToken);
          });
        default:
          this.logger.error('[Default Token Error]', e.stack, e.context);
          throw new HttpException('서버 오류', 500);
      }
    }

    next();
  }
}
