import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createLessonCourseUnitsTable1611375600000
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'lesson_course_units',
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
            name: 'course_unit_id',
            type: 'int',
          },
          {
            name: 'lesson_permission_type_id',
            type: 'int',
          },
          {
            name: 'less',
            type: 'int',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'color',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'order',
            type: 'int',
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
    await queryRunner.createForeignKeys('lesson_course_units', [
      new TableForeignKey({
        columnNames: ['lesson_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'lessons',
      }),
      new TableForeignKey({
        columnNames: ['course_unit_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'course_units',
      }),
      new TableForeignKey({
        columnNames: ['lesson_permission_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.lesson_permission_types',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('lesson_course_units');
  }
}
