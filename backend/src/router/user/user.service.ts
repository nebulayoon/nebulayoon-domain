import { Inject, Injectable } from '@nestjs/common';
import { EntityService } from 'src/database/main.service';
import { RegisterDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(EntityService) private readonly entityService: EntityService,
  ) {}

  async register(register: RegisterDto) {
    const user = await (async () => {
      try {
        return await this.entityService.user.findUser(register.email);
      } catch (e) {
        logger.error(
          '[UserService->register] findUser 실패',
          e.stack,
          e.context,
        );
        return undefined;
      }
    })();

    if (user) {
      Error('User 중복');
    } else if (user === undefined) {
      return undefined;
    }

    try {
      return await this.entityService.user.create(register);
    } catch (e) {
      logger.error('[UserService->register] create 실패', e.stack, e.context);
      return undefined;
    }
  }

  async login() {}
}
