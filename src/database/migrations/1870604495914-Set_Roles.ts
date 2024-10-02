import {MigrationInterface, QueryRunner} from "typeorm";

export class SetRoles1870604495914 implements MigrationInterface {
    name = 'SetRoles1870604495914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "rol" VALUES ('03baf633-34b1-43c0-bfd2-e58fadcb84d5', '2022-12-6 23:59:59.999', 'ADMIN', 'ADMIN');`);
        await queryRunner.query(`INSERT INTO "rol" VALUES ('03baf633-34b1-43c0-bfd2-e58fadcb8425', '2022-12-6 23:59:59.999', 'CLIENTE', 'CLIENTE');`);
        await queryRunner.query(`INSERT INTO "rol" VALUES ('03baf633-34b1-43c0-bfd2-e58fadcb8415', '2022-12-6 23:59:59.999', 'EMPLEADO', 'EMPLEADO');`);

        //Adicionar usuario miss con el pass 
        await queryRunner.query(`INSERT INTO "usuarios" VALUES ('b490ad6d-ae4e-4969-8ace-2c3ae76fae05', '2021-12-26 21:19:10.951', 'Misleidy L. Lujan Herrera', 'miss', 'mlairse@gmail.com', 'calle A', '$2b$10$BcTBiwzD8zxwYiWiRbqymevNzpv6Yzg9e0ku5K//mUBBVdNiAtvKO', 55532269, '03baf633-34b1-43c0-bfd2-e58fadcb84d5');`);
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rol" DROP NOT NULL` );
        await queryRunner.query(`ALTER TABLE "usuarios" DROP NOT NULL` );

    }

    
}
