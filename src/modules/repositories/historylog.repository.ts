import { EntityRepository, Repository } from 'typeorm';
import { Historylog } from '../entity/historylog.entity';

@EntityRepository(Historylog)
export class HistorylogRepository extends Repository<Historylog> {}
