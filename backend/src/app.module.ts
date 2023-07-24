import { Module } from '@nestjs/common';
import { EntityServiceModule } from '@database/main.module';
import { PostgresEntityModule } from '@database/postgres/postgres.module';
import { LoggerModule, TimeModule } from './common';

@Module({
  imports: [
    PostgresEntityModule,
    EntityServiceModule,
    LoggerModule,
    TimeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
