import { OneToMany, Column, Entity } from 'typeorm';
import { Usuarios } from './usuarios.entity';
import { Basetable } from 'src/database/base.tables';

@Entity('rol')
export class Rol extends Basetable {

  @Column({ type: 'varchar', unique: true, nullable: false })
  nombre: string;

  @Column({ type: 'text', nullable: false })
  descripcion: string;

  //Un rol tiene muchos usuarios
  @OneToMany(() => Usuarios, usuarios => usuarios.rol)
  usuarios: Usuarios;
}
