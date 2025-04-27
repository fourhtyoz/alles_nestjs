import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1745779455295 implements MigrationInterface {
    name = 'Migration1745779455295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "isActive" boolean NOT NULL DEFAULT true
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "isActive"
        `);
    }

}
