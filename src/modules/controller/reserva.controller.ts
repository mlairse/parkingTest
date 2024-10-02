import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

//Para determinar los roles y permisos
import { AuthGuard } from '@nestjs/passport';
import { RolType } from '../enums/roltype.enum';
import { Usuarios } from '../entity/usuarios.entity';
import { Roles } from '../auth/decorators/role.decorator';
import { GetUser } from '../auth/decorators/user.decorator';
import { ReservaService } from '../services/reservas.service';
import { Reservas } from '../entity/reservas.entity';
import { CreateReservaDTO } from '../dto/CreateReserva.dto';
import { EditReservaDTO } from '../dto/EditReserva.dto';

@Controller('reserva')
export class ReservaController {
  constructor(private readonly _reservaService: ReservaService) { }

  @Roles(RolType.ADMIN)
  @UseGuards(AuthGuard())
  @Get()
  getAll(): Promise<Reservas[]> {
    return this._reservaService.getAll();
  }

  @Roles(RolType.ADMIN)
  @UseGuards(AuthGuard())
  @Post()
  create(@Body() datos: CreateReservaDTO, @GetUser() currentUser: Usuarios): Promise<Reservas> {
    return this._reservaService.checkReserva(datos, currentUser);
  }

  @Roles(RolType.ADMIN)
  @UseGuards(AuthGuard())
  @Patch(':id')
  update(@Param('id') id: string, @Body() datos: EditReservaDTO, @GetUser() currentUser: Usuarios): Promise<Reservas> {
    return this._reservaService.update(id, datos, currentUser);
  }

  @Roles(RolType.ADMIN)
  @UseGuards(AuthGuard())
  @Delete(':id')
  delete(@Param('id') id: string, @GetUser() currentUser: Usuarios) {
    return this._reservaService.delete(id, currentUser);
  }

}
