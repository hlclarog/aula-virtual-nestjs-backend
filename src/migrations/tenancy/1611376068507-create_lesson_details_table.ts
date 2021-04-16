import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createLessonDetailsTable1611376068507
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'lesson_details',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'lesson_id',
            type: 'int',
          },
          {
            name: 'content_type_id',
            type: 'int',
          },
          {
            name: 'content',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'order',
            type: 'int',
          },
          {
            name: 'visible',
            type: 'boolean',
            default: true,
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
    await queryRunner.createForeignKeys('lesson_details', [
      new TableForeignKey({
        columnNames: ['lesson_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'lessons',
      }),
      new TableForeignKey({
        columnNames: ['content_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.content_types',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('lesson_details');
  }
}
