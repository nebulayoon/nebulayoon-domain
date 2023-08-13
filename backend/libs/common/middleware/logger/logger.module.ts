import { MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';

export class MLoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
