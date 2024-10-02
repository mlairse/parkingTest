import {MigrationInterface, QueryRunner} from "typeorm";

export class Relaciones1718905283883 implements MigrationInterface {
    name = 'Relaciones1718905283883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservas" ADD "usuarioId" uuid`);
        await queryRunner.query(`ALTER TABLE "reservas" ADD "parqueoId" uuid`);
        await queryRunner.query(`ALTER TABLE "reservas" ADD CONSTRAINT "FK_8adfd4e4e0c39ff814a6f9c1841" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservas" ADD CONSTRAINT "FK_c0b579f2d356d62764980f67509" FOREIGN KEY ("parqueoId") REFERENCES "parqueos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservas" DROP CONSTRAINT "FK_c0b579f2d356d62764980f67509"`);
        await queryRunner.query(`ALTER TABLE "reservas" DROP CONSTRAINT "FK_8adfd4e4e0c39ff814a6f9c1841"`);
        await queryRunner.query(`ALTER TABLE "reservas" DROP COLUMN "parqueoId"`);
        await queryRunner.query(`ALTER TABLE "reservas" DROP COLUMN "usuarioId"`);
    }

}
