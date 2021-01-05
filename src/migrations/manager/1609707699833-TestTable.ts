import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestTable1609707699833 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.createTable(
    //   new Table({
    //     name: 'test',
    //     columns: [
    //       {
    //         name: 'id',
    //         type: 'int',
    //         isPrimary: true,
    //         isGenerated: true,
    //       },
    //       {
    //         name: 'name',
    //         type: 'varchar',
    //       },
    //     ],
    //   }),
    //   true,
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('test');
  }
}
