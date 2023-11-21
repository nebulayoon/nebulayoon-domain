import { Inject, Injectable } from '@nestjs/common';
import { EntityService } from '../../database/main.service';
import { CustomLoggerService } from '@libs/common/log/logger.service';

@Injectable()
export class ProductService {
  constructor(
    @Inject(EntityService) private readonly entityService: EntityService,
    @Inject(CustomLoggerService) private readonly logger: CustomLoggerService,
  ) {}

  async getProducts() {
    try {
      const result = await this.entityService.product.findAll();
      return result;
    } catch (e: any) {
      this.logger.error('[ProductService] findAll 실패');
      return undefined;
    }
  }
}
