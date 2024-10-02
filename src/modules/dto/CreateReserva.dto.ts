
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjsx/crud/lib/crud';

@Exclude()
export class CreateReservaDTO {

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  hora_ini: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  hora_fin: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  fecha: Date;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  vehiculo: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  id_parqueo: string;
}
