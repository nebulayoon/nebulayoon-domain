import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { QuasarzoneService } from '../site/quasarzone.service';

@Injectable()
export class BatchService implements OnApplicationBootstrap {
  constructor(
    @Inject(QuasarzoneService)
    private readonly quasarzoneService: QuasarzoneService,
  ) {}
  @Cron('0 */10 * * * *')
  async run() {
    console.log('cron start');
    if (process.env?.NODE_ENV !== 'production') {
      console.log('[DEV] cron tab 동작 확인');
    } else {
      this.quasarzoneService.getProducts(5).then(() => console.log('동작완료'));
    }
  }

  onApplicationBootstrap() {
    this.run();
  }
}
