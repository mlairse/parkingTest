import {MigrationInterface, QueryRunner} from "typeorm";

export class fixReserva1718732543355 implements MigrationInterface {
    name = 'fixReserva1718732543355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservas" DROP CONSTRAINT "UQ_da54b9ff29ec3b56dfae231d8b9"`);
        await queryRunner.query(`ALTER TABLE "reservas" DROP COLUMN "direccion"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservas" ADD "direccion" character varying(250) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservas" ADD CONSTRAINT "UQ_da54b9ff29ec3b56dfae231d8b9" UNIQUE ("direccion")`);
    }

}
