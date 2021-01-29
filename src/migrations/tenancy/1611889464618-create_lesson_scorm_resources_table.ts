import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createLessonScormResourcesTable1611889464618
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'lesson_scorm_resources',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'lesson_scorm_id',
            type: 'int',
          },
          {
            name: 'index',
            type: 'varchar',
          },
          {
            name: 'identifier',
            type: 'varchar',
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
    await queryRunner.createForeignKeys('lesson_scorm_resources', [
      new TableForeignKey({
        columnNames: ['lesson_scorm_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'lesson_scorms',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('lesson_scorm_resources');
  }
}
