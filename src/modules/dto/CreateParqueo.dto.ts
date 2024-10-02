
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjsx/crud/lib/crud';

@Exclude()
export class CreateParqueoDTO {

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  plazas:number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  direccion: string;
}
