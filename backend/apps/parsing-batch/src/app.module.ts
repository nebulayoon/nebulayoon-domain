import { Module } from '@nestjs/common';
import { BatchModule } from './batch/batch.module';
import { SignalModule } from './router/signal/signal.module';
import { PostgresEntityModule } from './database/postgres/postgres.module';
import { EntityServiceModule } from './database/main.module';
import { QuasarzoneModule } from './site/quasarzone.module';

@Module({
  imports: [
    BatchModule,
    SignalModule,
    PostgresEntityModule,
    EntityServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
