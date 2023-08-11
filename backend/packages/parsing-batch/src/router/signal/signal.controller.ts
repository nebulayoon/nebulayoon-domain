import { Controller, Get, Inject } from '@nestjs/common';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { executablePath } from 'puppeteer';
import * as cheerio from 'cheerio';
import { QuasarzoneService } from 'src/site/quasarzone.service';

@Controller()
export class SignalController {
  constructor(
    @Inject(QuasarzoneService)
    private readonly quasarzoneService: QuasarzoneService,
  ) {}

  @Get()
  async mqListen() {
    return 'test';
  }
}
