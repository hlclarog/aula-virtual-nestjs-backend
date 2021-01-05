import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestTwoTable1609707708193 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.createTable(
    //   new Table({
    //     name: 'testtwo',
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
    //       {
    //         name: 'created_at',
    //         type: 'timestamp',
    //         default: 'now()',
    //       },
    //     ],
    //   }),
    //   true,
    // );
    //
    // await queryRunner.addColumn(
    //   'testtwo',
    //   new TableColumn({
    //     name: 'testId',
    //     type: 'int',
    //   }),
    // );
    //
    // await queryRunner.createForeignKey(
    //   'testtwo',
    //   new TableForeignKey({
    //     columnNames: ['testId'],
    //     referencedColumnNames: ['id'],
    //     referencedTableName: 'public.test',
    //     onDelete: 'CASCADE',
    //   }),
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('testtwo');
  }
}
