import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createProgramUsersCourseTable1618470611707
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'program_users_course',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'program_user_id',
            type: 'int',
          },
          {
            name: 'course_user_id',
            type: 'int',
          },
          {
            name: 'credits',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'homologue',
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
    await queryRunner.createForeignKeys('program_users_course', [
      new TableForeignKey({
        columnNames: ['program_user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'program_users',
      }),
      new TableForeignKey({
        columnNames: ['course_user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'course_users',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('program_users_course');
  }
}
