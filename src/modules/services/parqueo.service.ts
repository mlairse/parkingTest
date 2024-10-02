import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistorylogService } from './historylog.service';
import { Usuarios } from '../entity/usuarios.entity';
import { Historylog } from '../entity/historylog.entity';
import { criterios } from '../enums/entity-status.enum';
import { Parqueos } from '../entity/parqueos.entity';
import { ParqueosRepository } from '../repositories/parqueos.repository';
import { CreateParqueoDTO } from '../dto/CreateParqueo.dto';

@Injectable()
export class ParqueoService {
  constructor(
    @InjectRepository(Parqueos)
    private readonly _parqueoRepository: ParqueosRepository,
    private readonly _historyService: HistorylogService
  ) { }

  async getAll(): Promise<Parqueos[]> {
    const selec: Parqueos[] = await this._parqueoRepository.find()

    return selec;
  }

  async create(datos: CreateParqueoDTO, currentUser: Usuarios): Promise<Parqueos> {
    const saved = await this._parqueoRepository.save(datos);
    //Insertar accion en el HistoryLOG
    const histDatos: Historylog = new Historylog;
    histDatos.accion = criterios.CREAR;
    histDatos.descripcion = saved.id;
    histDatos.tabla = "PARQUEOS";
    if (currentUser)
      histDatos.usuario = currentUser.usuario;
    else
      histDatos.usuario = "-";
    this._historyService.create(histDatos);

    return saved;
  }

  async delete(id: string, currentUser: Usuarios): Promise<boolean> {
    const isExist = await this._parqueoRepository.findOne({
      where: { id: id },
    });
    if (!isExist) {
      throw new NotFoundException('El Parqueo no existe');
    }
    await this._parqueoRepository.delete(id);
    //Insertar accion en el HistoryLOG
    const histDatos: Historylog = new Historylog;
    histDatos.accion = criterios.BORRAR;
    histDatos.descripcion = id;
    histDatos.tabla = "PARQUEO";
    if (currentUser)
      histDatos.usuario = currentUser.usuario;
    else
      histDatos.usuario = "-";
    this._historyService.create(histDatos);

    return true;
  }

  async update(id: string, datos: CreateParqueoDTO, currentUser: Usuarios): Promise<Parqueos> {
    const foundEl = await this._parqueoRepository.findOne({
      where: {id: id}
    });
    if (!foundEl) {
      throw new NotFoundException('This ROL not exist');
    }
    foundEl.nombre = datos.nombre;
    foundEl.direccion = datos.direccion;
    foundEl.plazas = datos.plazas;

    const updated = await this._parqueoRepository.save(foundEl);
    //Insertar accion en el HistoryLOG
    const histDatos: Historylog = new Historylog;
    // histDatos.accion = criterios.EDITAR;
    histDatos.descripcion = foundEl.id;
    histDatos.tabla = "PARQUEO";
    if (currentUser)
      histDatos.usuario = currentUser.usuario;
    else
      histDatos.usuario = "-";
    this._historyService.create(histDatos);
    return updated;
  }
}
