import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { executablePath, Browser } from 'puppeteer';

@Injectable()
export class CrawlerService {
  constructor(@Inject('BROWSER') private readonly browser: Browser) {}

  async readHtml(targetUrl: string): Promise<string> {
    const page = await this.browser.newPage();
    await page.goto(targetUrl);

    return page.content();
  }
}
