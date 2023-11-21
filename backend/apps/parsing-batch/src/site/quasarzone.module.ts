import { Module } from '@nestjs/common';
import { CrawlerModule } from '../crawler/crawler.module';
import { QuasarzoneService } from './quasarzone.service';

@Module({
  imports: [CrawlerModule.forRoot()],
  providers: [QuasarzoneService],
  exports: [QuasarzoneService],
})
export class QuasarzoneModule {}
