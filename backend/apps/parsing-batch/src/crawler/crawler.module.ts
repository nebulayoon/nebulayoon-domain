import { DynamicModule, Module, Provider } from '@nestjs/common';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { executablePath, Browser } from 'puppeteer';
import { CrawlerService } from './crawler.service';

@Module({})
export class CrawlerModule {
  static async forRoot(): Promise<DynamicModule> {
    puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: '/usr/bin/chromium-browser',
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
    });

    const BrowserProvider: Provider = {
      provide: 'BROWSER',
      useValue: browser,
    };

    return {
      module: CrawlerModule,
      providers: [BrowserProvider, CrawlerService],
      exports: [BrowserProvider, CrawlerService],
    };
  }
}
