
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjsx/crud/lib/crud';

@Exclude()
export class CreateUsuarioDTO {

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  telefono:number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  usuario: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  direccion: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  id_rol: string;
}
