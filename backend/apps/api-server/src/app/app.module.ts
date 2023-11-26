import { Module } from '@nestjs/common';
import { EntityServiceModule } from '../database/main.module';
import { PostgresEntityModule } from '../database/postgres/postgres.module';
import { LoggerModule, TimeModule } from '@libs/common';
import { MLoggerModule } from '@libs/common/middleware/logger/logger.module';
import { UserModule, ProductModule } from '../router';
import { RedisEntityModule } from '../database/redis/redis.module';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { MAuthTokenModule } from '../common/middleware/authtoken.module';

@Module({
  imports: [
    PostgresEntityModule,
    RedisEntityModule,
    EntityServiceModule,
    LoggerModule,
    TimeModule,
    MLoggerModule,
    MAuthTokenModule,
    AuthModule,
    UserModule,
    ProductModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
