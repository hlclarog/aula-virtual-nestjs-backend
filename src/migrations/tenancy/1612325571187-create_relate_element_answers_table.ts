import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createRelateElementAnswersTable1612325571187
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'relate_element_answers',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'activity_relate_element_id',
            type: 'int',
          },
          {
            name: 'term',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'definition',
            type: 'text',
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
    await queryRunner.createForeignKeys('relate_element_answers', [
      new TableForeignKey({
        columnNames: ['activity_relate_element_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'activity_relate_elements',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('relate_element_answers');
  }
}
