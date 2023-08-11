import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { ScheduleModule } from '@nestjs/schedule';
import { QuasarzoneModule } from 'src/site/quasarzone.module';

@Module({
  imports: [ScheduleModule.forRoot(), QuasarzoneModule],
  providers: [BatchService],
})
export class BatchModule {}
