import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createPointsUserLogTable1615472962404
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'points_user_log',
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
            name: 'point_reason_id',
            type: 'int',
          },
          {
            name: 'points',
            type: 'decimal',
            default: 0,
            precision: 18,
            scale: 0,
          },
          {
            name: 'course_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'lesson_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'activity_id',
            type: 'int',
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
      true,
    );
    await queryRunner.createForeignKeys('points_user_log', [
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
      new TableForeignKey({
        columnNames: ['point_reason_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.point_reasons',
      }),
      new TableForeignKey({
        columnNames: ['course_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'courses',
      }),
      new TableForeignKey({
        columnNames: ['lesson_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'lessons',
      }),
      new TableForeignKey({
        columnNames: ['activity_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'lesson_activities',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('points_user_log');
  }
}
