import { PrimaryGeneratedColumn, CreateDateColumn, BaseEntity} from "typeorm"

export class Basetable extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ nullable:true})
    createdAt: Date;
}

