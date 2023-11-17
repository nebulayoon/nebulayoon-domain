import { Inject, Injectable, forwardRef } from '@nestjs/common';
import {
  ProductEntityService,
  UserEntityService,
} from '@libs/database/service';

@Injectable()
export class EntityService {
  constructor(
    @Inject(UserEntityService)
    public readonly user: UserEntityService,
    @Inject(ProductEntityService)
    public readonly product: ProductEntityService,
  ) {}
}
