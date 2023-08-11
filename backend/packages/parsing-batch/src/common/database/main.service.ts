import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ProductEntityService } from './service';

@Injectable()
export class EntityService {
  constructor(
    @Inject(ProductEntityService)
    public readonly product: ProductEntityService,
  ) {}
}
