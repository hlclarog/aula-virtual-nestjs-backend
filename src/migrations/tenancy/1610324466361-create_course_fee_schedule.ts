import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createCourseFeeSchedule1610324466361
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'course_fee_schedules',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'currency_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'course_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'begin',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'end',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'course_val',
            type: 'decimal',
            isNullable: false,
            default: 0.0,
            precision: 2,
          },
          {
            name: 'certificate_val',
            type: 'decimal',
            isNullable: false,
            default: 0.0,
            precision: 2,
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
    await queryRunner.createForeignKeys('course_fee_schedules', [
      new TableForeignKey({
        columnNames: ['currency_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'currencies',
      }),
      new TableForeignKey({
        columnNames: ['course_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'courses',
      }),
    ]);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('course_fee_schedules');
  }
}
