import { EntityRepository, Repository } from 'typeorm';
import { Reservas } from '../entity/reservas.entity';

@EntityRepository(Reservas)
export class ReservasRepository extends Repository<Reservas> {}
