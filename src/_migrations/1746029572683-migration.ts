import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1746029572683 implements MigrationInterface {
    name = 'Migration1746029572683';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "article"
            ALTER COLUMN "status"
            SET DEFAULT 'published'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "article"
            ALTER COLUMN "status"
            SET DEFAULT 'draft'
        `);
    }
}
