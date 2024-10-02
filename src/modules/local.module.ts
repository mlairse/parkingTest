import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './entity/usuarios.entity';
import { Rol } from './entity/rol.entity';
import { Historylog } from './entity/historylog.entity';
import { UsuariosController } from './controller/usuarios.controller';
import { RolController } from './controller/rol.controller';
import { HistorylogController } from './controller/historylog.controller';
import { UsuariosService } from './services/usuarios.service';
import { RolService } from './services/rol.service';
import { HistorylogService } from './services/historylog.service';
import { UsuariosRepository } from './repositories/usuarios.repository';
import { RolRepository } from './repositories/rol.repository';
import { HistorylogRepository } from './repositories/historylog.repository';
import { PassportModule } from '@nestjs/passport';
import { Parqueos } from './entity/parqueos.entity';
import { ParqueoController } from './controller/parqueo.controller';
import { ParqueoService } from './services/parqueo.service';
import { ParqueosRepository } from './repositories/parqueos.repository';
import { Reservas } from './entity/reservas.entity';
import { ReservaController } from './controller/reserva.controller';
import { ReservaService } from './services/reservas.service';
import { ReservasRepository } from './repositories/reservas.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
   Usuarios,
   Rol,
   Historylog,
   Parqueos,
   Reservas,
  ]),
  PassportModule.register({
    defaultStrategy: 'jwt',
  })],

  controllers: [
    UsuariosController,
    RolController,
    HistorylogController,
    ParqueoController,
    ReservaController,
  ],

  providers: [
    // ...Services
    UsuariosService,
    RolService, 
    HistorylogService,
    ParqueoService,
    ReservaService,
    // ...Repositories
    UsuariosRepository,
    RolRepository,
    HistorylogRepository,
    ParqueosRepository,
    ReservasRepository,
  ],

  exports: [
    UsuariosService,
    HistorylogService, 
    RolService,
  ]
})
export class LocalModule {}
