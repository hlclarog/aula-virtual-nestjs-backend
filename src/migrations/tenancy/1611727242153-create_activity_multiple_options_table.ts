import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createActivityMultipleOptionsTable1611727242153
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'activity_multiple_options',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'statement',
            type: 'text',
          },
          {
            name: 'observation',
            type: 'text',
          },
          {
            name: 'picture',
            type: 'varchar',
          },
          {
            name: 'video',
            type: 'varchar',
          },
          {
            name: 'audio',
            type: 'varchar',
          },
          {
            name: 'resource_type_id',
            type: 'int',
            isNullable: true,
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
    await queryRunner.createForeignKeys('activity_multiple_options', [
      new TableForeignKey({
        columnNames: ['resource_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'resource_types',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('activity_multiple_options');
  }
}
