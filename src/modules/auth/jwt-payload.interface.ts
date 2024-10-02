/* eslint-disable prettier/prettier */

export interface IJwtPayload {
  id: string;
  usuario: string;
  email: string;
  rol: string;
  nombre: string;
  iat?: Date;
  // id_empresa: string
  // roles
}