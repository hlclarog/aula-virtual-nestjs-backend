import { MODULES_ENTITY } from './../../api/acl/modules/modules.dto';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { SeedModules } from '../seeds/modules.seed';

export class seedModules1608236668402 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .getRepository(MODULES_ENTITY)
      .save(SeedModules);
  }

  public async down(): Promise<void> {}
}
