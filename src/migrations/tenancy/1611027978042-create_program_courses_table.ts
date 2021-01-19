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
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'program_id',
            type: 'int',
          },
          {
            name: 'transaction_status_id',
            type: 'int',
          },
          {
            name: 'paid_reference',
            type: 'varchar',
          },
          {
            name: 'begin_date',
            type: 'date',
          },
          {
            name: 'end_date',
            type: 'date',
          },
          {
            name: 'ref_transaction',
            type: 'varchar',
          },
          {
            name: 'paid_value',
            type: 'decimal',
            isNullable: false,
            default: 0.0,
            precision: 18,
            scale: 2,
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
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
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
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('program_courses');
  }
}
