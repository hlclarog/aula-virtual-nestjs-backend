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
            name: 'certificate_file',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'downloaded',
            type: 'bool',
            default: false,
          },
          {
            name: 'certificate_code_validation',
            type: 'varchar',
            isNullable: true,
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
      'program_users',
      new TableUnique({
        name: 'UNIQUE_program_users_program_id_user_id',
        columnNames: ['program_id', 'user_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('program_users');
  }
}
