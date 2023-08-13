import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserEntityService } from '@libs/database/service';

@Injectable()
export class EntityService {
  constructor(
    @Inject(UserEntityService)
    public readonly user: UserEntityService,
  ) {}
}
