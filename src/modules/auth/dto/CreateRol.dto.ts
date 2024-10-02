import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

@Exclude()
export class CreateRolDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  descripcion: string;
}
