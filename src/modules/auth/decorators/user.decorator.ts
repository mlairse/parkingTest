import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Usuarios } from '../../../modules/entity/usuarios.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): Usuarios => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);