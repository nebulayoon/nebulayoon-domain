import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserEntityService } from './service';

@Injectable()
export class EntityService {
  constructor(
    @Inject(UserEntityService)
    public readonly user: UserEntityService,
  ) {}
}
