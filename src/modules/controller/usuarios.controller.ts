import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

//Para determinar los roles y permisos
import { AuthGuard } from '@nestjs/passport';
import { UsuariosService } from '../services/usuarios.service';
import { RolType } from '../enums/roltype.enum';
import { Usuarios } from '../entity/usuarios.entity';
import { CreateUsuarioDTO } from '../dto/CreateUsuario.dto';
import { Roles } from '../auth/decorators/role.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { GetUser } from '../auth/decorators/user.decorator';
import { EditUsuarioDTO } from '../dto/EditUsuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly _userService: UsuariosService) { }

  @Roles(RolType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  @Get('getbyid/:userid')
  getbyid(@Param('userid') userid: string): Promise<Usuarios> {
    return this._userService.getbyid(userid);
  }

  @Roles(RolType.ADMIN)
  @UseGuards(AuthGuard())
  @Get()
  getAll(): Promise<Usuarios[]> {
    return this._userService.getAll();
  }

  @Roles(RolType.ADMIN)
  @UseGuards(AuthGuard())
  @Patch(':userid')
  updateUser(@Param('userid') userid: string, @Body() user: EditUsuarioDTO, @GetUser() currentUser: Usuarios) {
    return this._userService.update(userid, user, currentUser);
  }

  @Roles(RolType.ADMIN)
  @UseGuards(AuthGuard())
  @Delete(':userid')
  deleteUser(@Param('userid') userid: string, @GetUser() currentUser: Usuarios): Promise<boolean> {
    return this._userService.delete(userid, currentUser);
  }

  @Roles(RolType.ADMIN)
  @UseGuards(AuthGuard())
  @Post()
  createUser(@Body() user: CreateUsuarioDTO, @GetUser() currentUser: Usuarios): Promise<Usuarios> {
    return this._userService.create(user, currentUser);
  }

}

