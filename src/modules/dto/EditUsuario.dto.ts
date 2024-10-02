
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjsx/crud/lib/crud';

@Exclude()
export class EditUsuarioDTO {

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  nombre?: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  telefono?:number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  direccion?: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  email: string;
}
