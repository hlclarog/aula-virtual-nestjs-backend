import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createProgramCoursesTable1611027978042
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'program_courses',
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
            name: 'program_id',
            type: 'int',
          },
          {
            name: 'transaction_status_id',
            isNullable: true,
            type: 'int',
          },
          {
            name: 'program_courses_status_id',
            isNullable: true,
            type: 'int',
          },
          {
            name: 'credits',
            isNullable: true,
            type: 'int',
          },
          {
            name: 'certifiable',
            type: 'bool',
            default: false,
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

    await queryRunner.createForeignKeys('program_courses', [
      new TableForeignKey({
        columnNames: ['course_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'courses',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['program_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'programs',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['transaction_status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'transaction_status',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['program_courses_status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'program_courses_status',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('program_courses');
  }
}
