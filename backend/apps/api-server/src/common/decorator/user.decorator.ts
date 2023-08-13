import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IAuthToken } from '../../auth/types/auth.type';

type TRequestWithUser = Request & { user: IAuthToken };

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as TRequestWithUser;
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
