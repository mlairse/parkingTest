import { Basetable } from 'src/database/base.tables';
import { Entity, Column, ManyToOne } from 'typeorm';
import { status } from '../enums/entity-status.enum';
import { Usuarios } from './usuarios.entity';
import { Parqueos } from './parqueos.entity';


@Entity('reservas')
export class Reservas extends Basetable {

  @Column({ 
    type: 'varchar', 
    length: 25, 
    nullable: false,
    default: status.RESERVADA })
  status: string;

  @Column({ type: 'numeric', nullable: true })
  hora_ini: number;

  @Column({ type: 'numeric', nullable: true })
  hora_fin: number;

  @Column({ type: 'numeric', nullable: true })
  hora_entrada: number;

  @Column({ type: 'numeric', nullable: true })
  hora_salida: number;

  @Column({ type: 'date', nullable: false })
  fecha: Date;

  @Column({ type: 'varchar', length: 250, nullable: false })
  vehiculo: string;

  @ManyToOne(() => Usuarios, usuario => usuario.reserva)
  usuario: Usuarios;

  @ManyToOne(() => Parqueos, parqueo => parqueo.reserva)
  parqueo: Parqueos;
}
