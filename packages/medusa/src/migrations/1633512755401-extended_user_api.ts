import {MigrationInterface, QueryRunner} from "typeorm";

export class extendedUserApi1633512755401 implements MigrationInterface {
    name = 'extendedUserApi1633512755401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "invite_role_enum" AS ENUM('admin', 'member', 'developer')`);
        await queryRunner.query(`CREATE TABLE "invite" ("id" character varying NOT NULL, "user_email" character varying NOT NULL, "role" "invite_role_enum" DEFAULT 'member', "accepted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "metadata" jsonb, CONSTRAINT "PK_fc9fa190e5a3c5d80604a4f63e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('admin', 'member', 'developer')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "user_role_enum" DEFAULT 'member'`);
        await queryRunner.query(`ALTER TABLE "store" ADD "invite_link_template" character varying`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_6b0ce4b4bcfd24491510bf19d1" ON "invite" ("user_email") WHERE deleted_at IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_6b0ce4b4bcfd24491510bf19d1"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "invite"`);
        await queryRunner.query(`DROP TYPE "invite_role_enum"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "invite_link_template"`);
    }

}