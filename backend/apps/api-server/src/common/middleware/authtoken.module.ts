import { MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { AuthTokenMiddleware } from './authtoken.middleware';

export class MAuthTokenModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthTokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
