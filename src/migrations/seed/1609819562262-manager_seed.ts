import { MigrationInterface, QueryRunner } from 'typeorm';

export class managerSeed1609819562262 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //   await queryRunner.connection
    //     .getRepository(USERS_ENTITY)
    //     .save(USERS_DATA_SEED);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
