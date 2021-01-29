import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createLessonScormDetailsTable1611889493418
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'lesson_scorm_details',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'lesson_scorm_intent_id',
            type: 'int',
          },
          {
            name: 'key',
            type: 'varchar',
          },
          {
            name: 'value',
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
    await queryRunner.createForeignKeys('lesson_scorm_details', [
      new TableForeignKey({
        columnNames: ['lesson_scorm_intent_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'lesson_scorm_intents',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('lesson_scorm_details');
  }
}
