import { EntityRepository, Repository } from 'typeorm';
import { Parqueos } from '../entity/parqueos.entity';

@EntityRepository(Parqueos)
export class ParqueosRepository extends Repository<Parqueos> {}
