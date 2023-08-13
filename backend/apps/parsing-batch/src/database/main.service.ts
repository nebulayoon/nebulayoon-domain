import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ProductEntityService } from '@libs/database/service';

@Injectable()
export class EntityService {
  constructor(
    @Inject(ProductEntityService)
    public readonly product: ProductEntityService,
  ) {}
}
