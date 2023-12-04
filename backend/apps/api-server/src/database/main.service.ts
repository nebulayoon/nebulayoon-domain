import { Inject, Injectable, forwardRef } from '@nestjs/common';
import {
  PostCommentEntityService,
  PostEntityService,
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
    @Inject(PostEntityService)
    public readonly post: PostEntityService,
    @Inject(PostCommentEntityService)
    public readonly comment: PostCommentEntityService,
  ) {}
}
