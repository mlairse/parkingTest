import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles: string[] = this._reflector.get<string[]>(
      'rol',
      context.getHandler(),
    );
    if (!roles) {
      return false
    }
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    let hasRole = false;
    if (roles.includes(user.rol.nombre)) {
      hasRole = true;
    }   
    return user && user.rol && hasRole;
  }
}
