import { Module } from '@nestjs/common';
import { EntityServiceModule } from './database/main.module';
import { PostgresEntityModule } from './database/postgres/postgres.module';
import { LoggerModule, TimeModule } from '@libs/common';
import { MLoggerModule } from '@libs/common/middleware/logger/logger.module';
import { UserModule } from './router';
import { RedisEntityModule } from './database/redis/redis.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    PostgresEntityModule,
    RedisEntityModule,
    EntityServiceModule,
    LoggerModule,
    TimeModule,
    MLoggerModule,
    AuthModule,
    UserModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
