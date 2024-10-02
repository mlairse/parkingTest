import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';

//Para determinar los roles y permisos
import { AuthGuard } from '@nestjs/passport';
import { RolService } from '../services/rol.service';
import { RolType } from '../enums/roltype.enum';
import { Rol } from '../entity/rol.entity';
import { CreateRolDto } from 'src/modules/auth/dto/CreateRol.dto';
import { Usuarios } from '../entity/usuarios.entity';
import { Roles } from '../auth/decorators/role.decorator';
import { GetUser } from '../auth/decorators/user.decorator';

@Controller('rol')
export class RolController {
  constructor(private readonly _rolService: RolService) { }

  @Roles(RolType.ADMIN)
  @UseGuards(AuthGuard())
  @Get()
  getRol(): Promise<Rol[]> {
    return this._rolService.getAll();
  }

  @Roles(RolType.ADMIN)
  @UseGuards(AuthGuard())
  @Post()
  createRol(@Body() role: CreateRolDto, @GetUser() currentUser: Usuarios): Promise<Rol> {
    return this._rolService.create(role, currentUser);
  }

  @Roles(RolType.ADMIN)
  @UseGuards(AuthGuard())
  @Delete(':rolid')
  deleteRol(@Param('rolid') id: string, @GetUser() currentUser: Usuarios) {
    return this._rolService.delete(id, currentUser);
  }

}
