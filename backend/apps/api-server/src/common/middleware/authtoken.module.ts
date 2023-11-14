import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthTokenMiddleware } from './authtoken.middleware';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [AuthModule],
})
export class MAuthTokenModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthTokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
