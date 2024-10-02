import { EntityRepository, Repository } from 'typeorm';
import { Usuarios } from '../entity/usuarios.entity';

@EntityRepository(Usuarios)
export class UsuariosRepository extends Repository<Usuarios> {}
