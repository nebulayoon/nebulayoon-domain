import { Module } from '@nestjs/common';
import { EntityServiceModule } from '@database/main.module';
import { PostgresEntityModule } from '@database/postgres/postgres.module';
import { LoggerModule, TimeModule } from './common';
import { MLoggerModule } from '@common/middleware/logger/logger.module';
import { UserModule } from './router';
import { RedisEntityModule } from '@database/redis/redis.module';
import { AuthModule } from './auth/auth.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
