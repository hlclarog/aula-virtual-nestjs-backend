import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export class createCourseUsersTable1611016200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'course_users',
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
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'transaction_status_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'enrollment_status_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'enrollment_type_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'begin_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'end_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'ref_transaction',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'certificate_file',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'certificate_code_validation',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'private_inscription',
            type: 'bool',
            default: false,
          },
          {
            name: 'favorite',
            type: 'bool',
            default: false,
          },
          {
            name: 'downloaded',
            type: 'bool',
            default: false,
          },
          {
            name: 'paid_value',
            type: 'decimal',
            isNullable: true,
            default: 0.0,
            precision: 18,
            scale: 2,
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
    await queryRunner.createForeignKeys('course_users', [
      new TableForeignKey({
        columnNames: ['course_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'courses',
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
    ]);

    await queryRunner.createUniqueConstraint(
      'course_users',
      new TableUnique({
        name: 'UNIQUE_course_users_course_id_user_id',
        columnNames: ['course_id', 'user_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('course_users');
  }
}
