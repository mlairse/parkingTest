/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjsx/crud/lib/crud';

export class SignupclienteDto {

  // 'r': Residencial, 'e': Estatal
  @IsNotEmpty()
  @IsString()
  tipo: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellidos: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  // Si es 'r' va el numero de carnet de identidad, si el 'e' va el numero de contrato
  @IsNotEmpty()
  @IsString()
  texto: string;

  @IsNotEmpty()
  @IsString()
  usuario: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  contactos: string;
}