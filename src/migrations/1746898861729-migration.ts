import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1746898861729 implements MigrationInterface {
    name = 'Migration1746898861729';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'Moderator', 'admin')
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'user'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "role"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."user_role_enum"
        `);
    }
}
