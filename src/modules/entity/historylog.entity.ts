import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('historylog')
export class Historylog extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ nullable: true })
    createdAt: Date;

    @CreateDateColumn({ nullable: true })
    updatedAt: Date;

    @Column({ type: 'varchar', nullable: true })
    accion: string;

    @Column({ type: 'varchar', nullable: true })
    tabla: string;

    @Column({ type: 'varchar', nullable: true })
    descripcion: string;

    @Column({ type: 'varchar', nullable: true })
    usuario: string;
}