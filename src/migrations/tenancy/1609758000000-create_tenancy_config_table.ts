import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTenancyConfigTable1609758000000
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tenancy_config',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'tenancy_id',
            type: 'int',
          },
          {
            name: 'theme_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'rol_default_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'allow_registration',
            type: 'bool',
            default: true,
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

    await queryRunner.createForeignKey(
      'tenancy_config',
      new TableForeignKey({
        columnNames: ['tenancy_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.tenancies',
      }),
    );

    await queryRunner.createForeignKey(
      'tenancy_config',
      new TableForeignKey({
        columnNames: ['theme_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.themes',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tenancy_config');
  }
}
