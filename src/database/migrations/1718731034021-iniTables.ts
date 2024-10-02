import {MigrationInterface, QueryRunner} from "typeorm";

export class iniTables1718731034021 implements MigrationInterface {
    name = 'iniTables1718731034021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "historylog" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "accion" character varying, "tabla" character varying, "descripcion" character varying, "usuario" character varying, CONSTRAINT "PK_535e9145b9e9a05981d27b8e051" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parqueos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP DEFAULT now(), "nombre" character varying(25) NOT NULL, "direccion" character varying(250) NOT NULL, "plazas" numeric, CONSTRAINT "UQ_e63c7542c0b961a598165062737" UNIQUE ("direccion"), CONSTRAINT "PK_6ea1ce2c53951a18f879f0f3b9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rol" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP DEFAULT now(), "nombre" character varying NOT NULL, "descripcion" text NOT NULL, CONSTRAINT "UQ_9792c580a992d554ee1621c5b45" UNIQUE ("nombre"), CONSTRAINT "PK_c93a22388638fac311781c7f2dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP DEFAULT now(), "nombre" character varying(50) NOT NULL, "usuario" character varying(25) NOT NULL, "email" character varying NOT NULL, "direccion" character varying NOT NULL, "password" character varying NOT NULL, "telefono" numeric, "rolId" uuid, CONSTRAINT "UQ_0790a401b9d234fa921e9aa1777" UNIQUE ("usuario"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reservas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP DEFAULT now(), "status" character varying(25) NOT NULL DEFAULT 'RESERVADA', "direccion" character varying(250) NOT NULL, "hora_ini" numeric, "hora_fin" numeric, "hora_entrada" numeric, "hora_salida" numeric, "fecha" date NOT NULL, "vehiculo" character varying(250) NOT NULL, CONSTRAINT "UQ_da54b9ff29ec3b56dfae231d8b9" UNIQUE ("direccion"), CONSTRAINT "PK_309c659053bcf5e56f8e40a2b42" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_df0c94be5a01a546bf1b9ca12ae" FOREIGN KEY ("rolId") REFERENCES "rol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_df0c94be5a01a546bf1b9ca12ae"`);
        await queryRunner.query(`DROP TABLE "reservas"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "rol"`);
        await queryRunner.query(`DROP TABLE "parqueos"`);
        await queryRunner.query(`DROP TABLE "historylog"`);
    }

}
