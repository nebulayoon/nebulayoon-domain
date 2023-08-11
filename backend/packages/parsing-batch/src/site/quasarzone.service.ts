import { Inject, Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { CrawlerService } from 'src/crawler/crawler.service';
import { IProductData, MonetaryUnit, ProductStatus } from './types/quasarzone';
import { EntityService } from 'src/common/database/main.service';
import { ProductEntity } from 'src/common/database/entity';
import * as fs from 'fs';

@Injectable()
export class QuasarzoneService {
  private baseUrl = `https://quasarzone.com`;
  constructor(
    @Inject(CrawlerService) private readonly crawler: CrawlerService,
    @Inject(EntityService) private readonly entityService: EntityService,
  ) {}

  private priceStringToNumber(price: string) {
    const regex = /([\d,\.]+)/;
    const match: RegExpMatchArray = price.match(regex);

    if (match && match[1]) {
      if (match[1].includes(',')) {
        return parseInt(match[1].replace(/,/g, ''), 10);
      } else if (match[1].includes('.')) {
        return Math.round(parseFloat(match[1].replace(/,/g, '')));
      } else {
        return parseInt(match[1], 10);
      }
    } else {
      return -1;
    }
  }

  private parseState(data: string): number {
    if (data.includes('종료')) return ProductStatus.End;
    else if (data.includes('진행중')) return ProductStatus.InProgress;
    else if (data.includes('인기')) return ProductStatus.Popular;
    else return ProductStatus.Etc;
  }

  private parseTitle(data: string): string {
    return data;
  }

  private parseCategory(data: string): string {
    return data;
  }

  private parseMonetaryUnit(data: string): number {
    if (data.includes('KRW')) {
      return MonetaryUnit.KRW;
    } else if (data.includes('USD')) {
      return MonetaryUnit.USD;
    } else {
      return MonetaryUnit.ETC;
    }
  }

  private parsePrice(data: string): number {
    return this.priceStringToNumber(data);
  }

  private digit(date: number): string {
    return ('0' + date.toString()).slice(-2);
  }

  private parseDate(data: string) {
    const regex = /^(\d{2}):(\d{2})$/;
    const timeMatch = data.match(regex);

    if (timeMatch) {
      const now = new Date();
      return `${this.digit(now.getMonth() + 1)}-${this.digit(now.getDate())}`;
    } else {
      return data;
    }
  }

  private parseWriter(data: string): string {
    return data;
  }

  private parseViews(data: string): number {
    const regex = /([\d\.]+)/;
    const match = data.match(regex);

    return data.toLowerCase().includes('k')
      ? Math.round(parseFloat(match[1]) * 1000)
      : parseInt(match[1]);
  }

  private parseLink(data: string): string {
    return `${this.baseUrl}${data}`;
  }

  private async parsingProducts(content: string): Promise<IProductData[]> {
    const $ = cheerio.load(content);
    const productList = $('div.market-info-list-cont');

    const buffer: IProductData[] = [];
    productList.each((_, element) => {
      const state = $(element).find('span.label').text().trim();
      const title = $(element)
        .find('span.ellipsis-with-reply-cnt')
        .text()
        .trim();
      const category = $(element).find('span.category').text().trim();
      const price = $(element).find('span.text-orange').text().trim();
      const date = $(element).find('span.date').text().trim();
      const writer = $(element)
        .find('span.user-nick-wrap.nick.d-inline-block')
        .attr('data-nick')
        .trim();
      const views = $(element).find('span.count').text().trim();
      const link = $(element).find('a.subject-link').attr('href');

      const refineData: IProductData = {
        stateNumber: this.parseState(state),
        title: this.parseTitle(title),
        category: this.parseCategory(category),
        monetaryUnit: this.parseMonetaryUnit(price),
        price: this.parsePrice(price),
        date: this.parseDate(date),
        writer: this.parseWriter(writer),
        views: this.parseViews(views),
        link: this.parseLink(link),
      };

      buffer.push(refineData);
    });

    return buffer;
  }

  async getProducts(syncPageSize: number): Promise<void> {
    const target = `${this.baseUrl}/bbs/qb_saleinfo?page=`;
    const urls: string[] = Array.from(
      { length: syncPageSize },
      (_, page) => `${target}${page + 1}`,
    );

    const htmls: string[] = await Promise.all(
      urls.map((url) => this.crawler.readHtml(url)),
    );

    const refines = await Promise.all(
      htmls.map((content) => {
        return this.parsingProducts(content);
      }),
    );

    const flattenRefines = refines.flatMap((x) => x);

    try {
      await this.entityService.product.upsert(flattenRefines);
    } catch (e: any) {
      console.log(e);
    }
  }
}
