import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';

//Para determinar los roles y permisos
import { AuthGuard } from '@nestjs/passport';
import { RolType } from '../enums/roltype.enum';
import { Usuarios } from '../entity/usuarios.entity';
import { Roles } from '../auth/decorators/role.decorator';
import { GetUser } from '../auth/decorators/user.decorator';
import { ParqueoService } from '../services/parqueo.service';
import { Parqueos } from '../entity/parqueos.entity';
import { CreateParqueoDTO } from '../dto/CreateParqueo.dto';

@Controller('parqueo')
export class ParqueoController {
  constructor(private readonly _parqueoService: ParqueoService) { }

  @Roles(RolType.ADMIN)
  @UseGuards(AuthGuard())
  @Get()
  getAll(): Promise<Parqueos[]> {
    return this._parqueoService.getAll();
  }

  @Roles(RolType.ADMIN)
  @UseGuards(AuthGuard())
  @Post()
  create(@Body() datos: CreateParqueoDTO, @GetUser() currentUser: Usuarios): Promise<Parqueos> {
    return this._parqueoService.create(datos, currentUser);
  }

  @Roles(RolType.ADMIN)
  @UseGuards(AuthGuard())
  @Delete(':id')
  delete(@Param('id') id: string, @GetUser() currentUser: Usuarios) {
    return this._parqueoService.delete(id, currentUser);
  }

}
