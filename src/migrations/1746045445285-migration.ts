import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1746045445285 implements MigrationInterface {
    name = 'Migration1746045445285';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "room" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "message" (
                "id" SERIAL NOT NULL,
                "text" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "authorId" integer,
                "roomId" integer,
                CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "message"
            ADD CONSTRAINT "FK_c72d82fa0e8699a141ed6cc41b3" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "message"
            ADD CONSTRAINT "FK_fdfe54a21d1542c564384b74d5c" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "message" DROP CONSTRAINT "FK_fdfe54a21d1542c564384b74d5c"
        `);
        await queryRunner.query(`
            ALTER TABLE "message" DROP CONSTRAINT "FK_c72d82fa0e8699a141ed6cc41b3"
        `);
        await queryRunner.query(`
            DROP TABLE "message"
        `);
        await queryRunner.query(`
            DROP TABLE "room"
        `);
    }
}
