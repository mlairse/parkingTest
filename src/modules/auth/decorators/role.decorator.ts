import { SetMetadata } from '@nestjs/common';

export const Roles = (...rol: string[]) => SetMetadata('rol', rol);

