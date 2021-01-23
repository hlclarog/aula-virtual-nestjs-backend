import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createLessonsTable1611376024663 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'lessons',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'course_id',
            type: 'int',
          },
          {
            name: 'lesson_type_id',
            type: 'int',
          },
          {
            name: 'course_unit_id',
            type: 'int',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'video_url',
            type: 'varchar',
          },
          {
            name: 'content',
            type: 'varchar',
          },
          {
            name: 'min_progress',
            type: 'int',
            default: 100,
          },
          {
            name: 'order',
            type: 'int',
          },
          {
            name: 'duration',
            type: 'int',
          },
          {
            name: 'suggested_weeks',
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
    await queryRunner.createForeignKeys('lessons', [
      new TableForeignKey({
        columnNames: ['course_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'courses',
      }),
      new TableForeignKey({
        columnNames: ['lesson_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.lesson_types',
      }),
      new TableForeignKey({
        columnNames: ['course_unit_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'course_units',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('lessons');
  }
}
