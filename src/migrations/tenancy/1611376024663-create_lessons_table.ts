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
            name: 'lesson_type_id',
            type: 'int',
          },
          {
            name: 'lesson_permission_type_id',
            type: 'int',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'video_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'content',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'min_progress',
            type: 'int',
            default: 100,
            isNullable: true,
          },
          {
            name: 'order',
            type: 'int',
            isNullable: true,
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
            name: 'max_due_date',
            type: 'timestamp',
            isNullable: true,

          },
          {
            name: 'delivery_late',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'date_type_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'visible',
            type: 'boolean',
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
    await queryRunner.createForeignKeys('lessons', [
      new TableForeignKey({
        columnNames: ['lesson_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.lesson_types',
      }),
      new TableForeignKey({
        columnNames: ['lesson_permission_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.lesson_permission_types',
      }),
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('lessons');
  }
}
