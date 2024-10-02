
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjsx/crud/lib/crud';

@Exclude()
export class EditReservaDTO {

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  hora_entrada: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  hora_salida: number;
}
