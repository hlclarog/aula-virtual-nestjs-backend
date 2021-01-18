import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProgramsFeeSchedue1610936083563
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'program_fee_schedules',
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
          },
          {
            name: 'program_id',
            type: 'int',
          },
          {
            name: 'begin',
            type: 'date',
          },
          {
            name: 'end',
            type: 'date',
          },
          {
            name: 'program_val',
            type: 'decimal',
            default: 0.0,
            precision: 18,
            scale: 2,
          },
          {
            name: 'certificate_val',
            type: 'decimal',
            isNullable: false,
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

    await queryRunner.createForeignKeys('program_fee_schedules', [
      new TableForeignKey({
        columnNames: ['currency_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'currencies',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['program_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'programs',
        onUpdate: 'CASCADE',
      }),
    ]);

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
            name: 'program_id',
            type: 'int',
          },
          {
            name: 'course_id',
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

    await queryRunner.createForeignKeys('program_courses', [
      new TableForeignKey({
        columnNames: ['program_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'programs',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['course_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'courses',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
