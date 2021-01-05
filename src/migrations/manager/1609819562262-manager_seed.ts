import { MigrationInterface, QueryRunner } from 'typeorm';
import { SERVER_TYPES_ENTITY } from '../../api/instance/server_types/server_types.dto';
import { SERVER_TYPE_DATA_SEED } from './seeds/server_type.seed';

export class managerSeed1609819562262 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.connection
    //   .getRepository(SERVER_TYPES_ENTITY)
    //   .save(SERVER_TYPE_DATA_SEED);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
