import { Basetable } from 'src/database/base.tables';
import { ManyToOne, Column, Entity, OneToMany } from 'typeorm';
import { Rol } from './rol.entity';
import { Reservas } from './reservas.entity';


@Entity('usuarios')
export class Usuarios extends Basetable {

  @Column({ type: 'varchar', length: 50, nullable: false })
  nombre: string;

  @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
  usuario: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  direccion: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'numeric', nullable: true })
  telefono: number;

  //Muchos usuarios pertenecen a un rol
  @ManyToOne(() => Rol, rol => rol.usuarios)
  rol: Rol;

  @OneToMany(() => Reservas, reserva => reserva.usuario)
  reserva: Reservas;

}
