import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistorylogService } from './historylog.service';
import { Usuarios } from '../entity/usuarios.entity';
import { Historylog } from '../entity/historylog.entity';
import { criterios } from '../enums/entity-status.enum';
import { Reservas } from '../entity/reservas.entity';
import { ReservasRepository } from '../repositories/reservas.repository';
import { CreateReservaDTO } from '../dto/CreateReserva.dto';
import { UsuariosRepository } from '../repositories/usuarios.repository';
import { Parqueos } from '../entity/parqueos.entity';
import { ParqueosRepository } from '../repositories/parqueos.repository';
import { EditReservaDTO } from '../dto/EditReserva.dto';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reservas)
    private readonly _reservasRepository: ReservasRepository,
    @InjectRepository(Usuarios)
    private readonly _userRepository: UsuariosRepository,
    @InjectRepository(Parqueos)
    private readonly _parqueoRepository: ParqueosRepository,
    private readonly _historyService: HistorylogService
  ) { }

  async getAll(): Promise<Reservas[]> {
    const selec: Reservas[] = await this._reservasRepository.find()

    return selec;
  }

  async create(datos: CreateReservaDTO, currentUser: Usuarios): Promise<Reservas> {
    const isUser = await this._userRepository.findOne({
      where: { id: currentUser.id },
    });
    if (!isUser) {
      throw new NotFoundException('El USUARIO no existe');
    }

    const isParkeo = await this._parqueoRepository.findOne({
      where: { id: datos.id_parqueo },
    });
    if (!isParkeo) {
      throw new NotFoundException('El PARQUEO no existe');
    }

    const newEl = new Reservas();
    newEl.hora_ini = datos.hora_ini;
    newEl.hora_fin = datos.hora_fin;
    newEl.fecha = datos.fecha;
    newEl.vehiculo = datos.vehiculo;
    newEl.usuario = isUser;
    newEl.parqueo = isParkeo;

    try{
      const saved = await this._reservasRepository.save(newEl);
      //Insertar accion en el HistoryLOG
      const histDatos: Historylog = new Historylog;
      histDatos.accion = criterios.CREAR;
      histDatos.descripcion = saved.id;
      histDatos.tabla = "RESERVAS";
      if (currentUser)
        histDatos.usuario = currentUser.usuario;
      else
        histDatos.usuario = "-";
      this._historyService.create(histDatos);
      return saved;

    }catch(error){
      // console.log(error)
      throw new BadRequestException(error.detail);
    }
  }

  async delete(id: string, currentUser: Usuarios): Promise<boolean> {
    const isExist = await this._reservasRepository.findOne({
      where: { id: id },
    });
    if (!isExist) {
      throw new NotFoundException('La RESERVA no existe');
    }
    await this._reservasRepository.delete(id);
    //Insertar accion en el HistoryLOG
    const histDatos: Historylog = new Historylog;
    histDatos.accion = criterios.BORRAR;
    histDatos.descripcion = id;
    histDatos.tabla = "RESERVAS";
    if (currentUser)
      histDatos.usuario = currentUser.usuario;
    else
      histDatos.usuario = "-";
    this._historyService.create(histDatos);

    return true;
  }

  async update(id: string, datos: EditReservaDTO, currentUser: Usuarios): Promise<Reservas> {
    const foundEl = await this._reservasRepository.findOne({
      where: {id: id}
    });
    if (!foundEl) {
      throw new NotFoundException('This RESERVA not exist');
    }
    foundEl.hora_entrada = datos.hora_entrada;
    foundEl.hora_salida = datos.hora_salida;

    const updated = await this._reservasRepository.save(foundEl);
    //Insertar accion en el HistoryLOG
    const histDatos: Historylog = new Historylog;
    histDatos.accion = criterios.EDITAR;
    histDatos.descripcion = foundEl.id;
    histDatos.tabla = "RESERVAS";
    if (currentUser)
      histDatos.usuario = currentUser.usuario;
    else
      histDatos.usuario = "-";
    this._historyService.create(histDatos);
    return updated;
  }

  async checkReserva(item: CreateReservaDTO, currentUser: Usuarios){
    const isParqueo = await this._parqueoRepository.findOne({
      where:{ id: item.id_parqueo }
    })
    if(!isParqueo) throw new NotFoundException('This PARQUEO not exist');

    const isExist = await this._reservasRepository.find({
      where: { 
        fecha: item.fecha,
        hora_ini: item.hora_ini,
        hora_fin: item.hora_fin,
        parqueo: isParqueo
       },
       relations: ['parqueo']
    })
    if(!isExist){
      const result = await this.create( item, currentUser )
      return result
    } else {
      if (isExist.length < isParqueo.plazas) {
        const result = await this.create( item, currentUser )
        return result
      } else {
        throw new NotAcceptableException(`Las plazas del PARQUEO: ${isParqueo.nombre} en ese horario estan OCUPADAS`);
      }
    }
  }
}
