import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { HistorylogRepository } from '../repositories/historylog.repository';
import { Historylog } from '../entity/historylog.entity';
import { HistorylogDTO } from '../dto/historylog.dto';

@Injectable()
export class HistorylogService {
  constructor(
    @InjectRepository(Historylog)
    private readonly _historyRepository: HistorylogRepository,
  ) {}

  async create(body: Historylog): Promise<boolean> {
    const newHist = new Historylog();
    newHist.accion = body.accion;
    newHist.tabla = body.tabla;
    newHist.descripcion = body.descripcion;
    newHist.usuario = body.usuario;

    try {
      const saved: Historylog = await this._historyRepository.save(newHist);
      return true;
    } catch (error) {
      throw new BadRequestException(error.detail);
    }
  }

  // async save(historyLogDTO: HistorylogDTO): Promise<HistorylogDTO> {
  //   const entity = HistorylogMapper.fromDTOtoEntity(historyLogDTO);
  //   try {
  //     const result = await this._historyRepository.save(entity);
  //     return HistorylogMapper.fromEntityToDTO(result);
  //   } catch (error) {
  //     throw new BadRequestException(error.detail);
  //   }
  // }

  async getAll(): Promise<Historylog[]> {
    const historylog: Historylog[] = await this._historyRepository.find();

    return historylog;
  }
}
