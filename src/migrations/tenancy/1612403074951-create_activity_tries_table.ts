import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createActivityTriesTable1612403074951
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'activity_tries',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'activity_try_user_id',
            type: 'int',
          },
          {
            name: 'passed',
            type: 'bool',
            default: false,
          },
          {
            name: 'answer',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'date',
            type: 'timestamp',
          },
          {
            name: 'active',
            type: 'bool',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
    await queryRunner.createForeignKeys('activity_tries', [
      new TableForeignKey({
        columnNames: ['activity_try_user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'activity_try_users',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('activity_tries');
  }
}
