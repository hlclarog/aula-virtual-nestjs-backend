import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export class createProgramUsersTable1611027848040
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'program_users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'program_id',
            type: 'int',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'transaction_status_id',
            type: 'int',
          },
          {
            name: 'enrollment_status_id',
            type: 'int',
          },
          {
            name: 'enrollment_type_id',
            type: 'int',
          },
          {
            name: 'course_id',
            type: 'int',
          },
          {
            name: 'begin_date',
            type: 'date',
          },
          {
            name: 'end_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'ref_transaction',
            type: 'varchar',
          },
          {
            name: 'paid_value',
            type: 'decimal',
            default: 0.0,
            precision: 10,
            scale: 2,
          },
          {
            name: 'private_inscription',
            type: 'bool',
            default: false,
          },
          {
            name: 'certificate_file',
            type: 'varchar',
          },
          {
            name: 'downloaded',
            type: 'bool',
            default: false,
          },
          {
            name: 'certificate_code_validation',
            type: 'varchar',
          },
          {
            name: 'favorite',
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
    await queryRunner.createForeignKeys('program_users', [
      new TableForeignKey({
        columnNames: ['program_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'programs',
      }),
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
      new TableForeignKey({
        columnNames: ['transaction_status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'transaction_status',
      }),
      new TableForeignKey({
        columnNames: ['enrollment_status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'enrollment_status',
      }),
      new TableForeignKey({
        columnNames: ['enrollment_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'enrollment_types',
      }),
      new TableForeignKey({
        columnNames: ['course_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'courses',
      }),
    ]);
    await queryRunner.createUniqueConstraint(
      'program_users',
      new TableUnique({
        name: 'UNIQUE_program_users_course_id_user_id',
        columnNames: ['course_id', 'user_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('program_users');
  }
}
