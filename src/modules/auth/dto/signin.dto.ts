/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  usuario: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

}