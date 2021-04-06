import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createLessonActivitiesTable1611723767778
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'lesson_activities',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'lesson_course_unit_id',
            type: 'int',
          },
          {
            name: 'activity_type_id',
            type: 'int',
          },
          {
            name: 'detail_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'visible',
            type: 'bool',
            default: true,
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
    await queryRunner.createForeignKeys('lesson_activities', [
      new TableForeignKey({
        columnNames: ['lesson_course_unit_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'lesson_course_units',
      }),
      new TableForeignKey({
        columnNames: ['activity_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.activity_types',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('lesson_activities');
  }
}
