import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createPlans1610312113726 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'plans',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
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
      true,
    );

    await queryRunner.addColumn('tenancies', {
      name: 'tenancy_plan_id',
      type: 'int',
      isNullable: true,
      isGenerated: false,
      isPrimary: false,
      isUnique: false,
      isArray: false,
      length: null,
      zerofill: false,
      unsigned: false,
      clone: null,
    });

    await queryRunner.createForeignKey(
      'tenancies',
      new TableForeignKey({
        name: 'FK_tenancies_tenancy_plan_id',
        columnNames: ['tenancy_plan_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.plans',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'tenancies',
      'FK_tenancies_tenancy_plan_id',
    );
    await queryRunner.dropColumn('tenancies', 'tenancy_plan_id');
    await queryRunner.dropTable('plans');
  }
}
