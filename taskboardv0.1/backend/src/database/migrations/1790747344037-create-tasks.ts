import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTasks1790747344037 implements MigrationInterface {
  name = 'CreateTasks1790747344037';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "tasks_id_seq" OWNED BY "tasks"."id"`,
    );

    await queryRunner.query(
      `SELECT setval('"tasks_id_seq"', COALESCE((SELECT MAX("id") FROM "tasks"), 1), (SELECT COUNT(*) > 0 FROM "tasks"))`,
    );

    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "id" SET DEFAULT nextval('"tasks_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "updated_at" SET DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "tasks_id_seq"`);
  }
}
