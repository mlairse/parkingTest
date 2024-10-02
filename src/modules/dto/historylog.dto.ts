import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Exclude } from 'class-transformer';

@Exclude()
export class HistorylogDTO {
  @ApiProperty()
  accion: string;

  @ApiProperty()
  tabla: string;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  usuario: string;
}
