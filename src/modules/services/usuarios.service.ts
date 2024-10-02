
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { UsuariosRepository } from '../repositories/usuarios.repository';
import { RolRepository } from '../repositories/rol.repository';
import { HistorylogService } from './historylog.service';
import { CreateUsuarioDTO } from '../dto/CreateUsuario.dto';
import { Usuarios } from '../entity/usuarios.entity';
import { Historylog } from '../entity/historylog.entity';
import { Rol } from '../entity/rol.entity';
import { criterios } from '../enums/entity-status.enum';
import { EditUsuarioDTO } from '../dto/EditUsuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly _userRepository: UsuariosRepository,
    @InjectRepository(Rol)
    private readonly _rolRepository: RolRepository,
    private readonly _historyService: HistorylogService,
  ) { }

  async create(user: CreateUsuarioDTO, currentUser: Usuarios): Promise<Usuarios> {

    const foundRol = await this._rolRepository.findOne({
      where:{id: user.id_rol}
    });
    if (!foundRol) {
      throw new NotFoundException('el rol no existe');
    }

    const newuser = new Usuarios();
    newuser.nombre = user.nombre;
    newuser.telefono = user.telefono;
    newuser.direccion = user.direccion;
    newuser.usuario = user.usuario;
    //para insertar pass cifrada
    const salt = await genSalt(10);
    newuser.password = await hash(user.password, salt);
    newuser.email = user.email;
    newuser.rol = foundRol;

    try {
      const savedUser: Usuarios = await this._userRepository.save(newuser);
      //Insertar accion en el HistoryLOG
      const histDatos: Historylog = new Historylog;
      histDatos.accion = criterios.CREAR;
      histDatos.descripcion = newuser.id;
      histDatos.tabla = "USUARIOS";
      if (currentUser)
        histDatos.usuario = currentUser.usuario;
      else
        histDatos.usuario = "-";
      this._historyService.create(histDatos);

      return savedUser;
    } catch (error) {
      throw new BadRequestException(error.detail);
    }
  }

  async getbyid(id: string): Promise<Usuarios> {
    if (!id) {
      throw new BadRequestException('Necesita enviar ID');
    }
    const user: Usuarios = await this._userRepository.findOne({
      where: {id: id},
      relations: ['rol'],
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async getAll(): Promise<Usuarios[]> {
    const users: Usuarios[] = await this._userRepository.find({
      relations: ['rol'],
    });
    return users;
  }

  async update(userid: string, user: EditUsuarioDTO, currentUser: Usuarios): Promise<Usuarios> {
    const founduser = await this._userRepository.findOne({
      where:{id: userid}
    });
    if (!founduser) {
      throw new NotFoundException('el usuario no existe');
    }
    founduser.nombre = user.nombre;
    founduser.telefono = user.telefono;
    founduser.direccion = user.direccion;
    founduser.email = user.email;

    try {
      const updateRow = await this._userRepository.save(founduser);
      //Insertar accion en el HistoryLOG
      const histDatos: Historylog = new Historylog;
      histDatos.accion = criterios.EDITAR;
      histDatos.descripcion = founduser.id;
      histDatos.tabla = "USUARIOS";
      if (currentUser)
        histDatos.usuario = currentUser.usuario;
      else
        histDatos.usuario = "-";
      this._historyService.create(histDatos);

      return updateRow;
    } catch (error) {
      throw new BadRequestException(error.detail);
    }
  }

  async delete(userid: string, currentUser: Usuarios): Promise<boolean> {
    const userExist = await this._userRepository.findOne({
      where: { id: userid },
    });
    if (!userExist) {
      throw new NotFoundException('El usuario no existe');
    }

    await this._userRepository.delete(userid);

    //Insertar accion en el HistoryLOG
    const histDatos: Historylog = new Historylog;
    histDatos.accion = criterios.BORRAR;
    histDatos.descripcion = userExist.id;
    histDatos.tabla = "USUARIOS";
    if (currentUser)
      histDatos.usuario = currentUser.usuario;
    else
      histDatos.usuario = "-";
    this._historyService.create(histDatos);

    return true;
  }

}
