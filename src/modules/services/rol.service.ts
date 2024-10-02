import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolRepository } from '../repositories/rol.repository';
import { HistorylogService } from './historylog.service';
import { Rol } from '../entity/rol.entity';
import { Usuarios } from '../entity/usuarios.entity';
import { Historylog } from '../entity/historylog.entity';
import { CreateRolDto } from '../auth/dto/CreateRol.dto';
import { criterios } from '../enums/entity-status.enum';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly _rolRepository: RolRepository,
    private readonly _historyService: HistorylogService
  ) { }

  async getAll(): Promise<Rol[]> {
    const role: Rol[] = await this._rolRepository.find({
      relations: ['usuarios'],
    });

    return role;
  }

  async create(role: CreateRolDto, currentUser: Usuarios): Promise<Rol> {
    const savedRol = await this._rolRepository.save(role);
    //Insertar accion en el HistoryLOG
    const histDatos: Historylog = new Historylog;
    // histDatos.accion = criterios.CREAR;
    histDatos.descripcion = savedRol.id;
    histDatos.tabla = "ROL";
    if (currentUser)
      histDatos.usuario = currentUser.usuario;
    else
      histDatos.usuario = "-";
    this._historyService.create(histDatos);

    return savedRol;
  }

  async delete(id: string, currentUser: Usuarios): Promise<boolean> {
    const rolExist = await this._rolRepository.findOne({
      where: { id: id },
    });
    if (!rolExist) {
      throw new NotFoundException('El USUARIO no existe');
    }
    await this._rolRepository.delete(id);
    //Insertar accion en el HistoryLOG
    const histDatos: Historylog = new Historylog;
    histDatos.accion = criterios.BORRAR;
    histDatos.descripcion = rolExist.id;
    histDatos.tabla = "ROL";
    if (currentUser)
      histDatos.usuario = currentUser.usuario;
    else
      histDatos.usuario = "-";
    this._historyService.create(histDatos);

    return true;
  }

  async update(roleid: string, role: Rol, currentUser: Usuarios): Promise<Rol> {
    const foundRol = await this._rolRepository.findOne({
      where: {id: roleid}
    });
    if (!foundRol) {
      throw new NotFoundException('This ROL not exist');
    }
    foundRol.nombre = role.nombre;
    foundRol.descripcion = role.descripcion;

    const updatedRol = await this._rolRepository.save(foundRol);
    //Insertar accion en el HistoryLOG
    const histDatos: Historylog = new Historylog;
    // histDatos.accion = criterios.EDITAR;
    histDatos.descripcion = foundRol.id;
    histDatos.tabla = "ROL";
    if (currentUser)
      histDatos.usuario = currentUser.usuario;
    else
      histDatos.usuario = "-";
    this._historyService.create(histDatos);
    return updatedRol;
  }
}
