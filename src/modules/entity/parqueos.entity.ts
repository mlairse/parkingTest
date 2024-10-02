import { Basetable } from 'src/database/base.tables';
import { Entity, Column, OneToMany } from 'typeorm';
import { Reservas } from './reservas.entity';


@Entity('parqueos')
export class Parqueos extends Basetable {

  @Column({ type: 'varchar', length: 25, nullable: false })
  nombre: string;

  @Column({ type: 'varchar', unique: true, length: 250, nullable: false })
  direccion: string;

  @Column({ type: 'numeric', nullable: true })
  plazas: number;

  @OneToMany(() => Reservas, reserva => reserva.parqueo)
  reserva: Reservas;
}
