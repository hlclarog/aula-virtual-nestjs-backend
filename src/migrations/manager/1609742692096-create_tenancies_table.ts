import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTenanciesTable1609742692096 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tenancies',
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
            name: 'alias',
            type: 'varchar',
          },
          {
            name: 'database_name',
            type: 'varchar',
          },
          {
            name: 'server_address',
            type: 'varchar',
          },
          {
            name: 'administrator',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'schema',
            type: 'varchar',
          },
          {
            name: 'activation_time',
            type: 'timestamp',
            default: 'now()',
            isNullable: true,
          },
          {
            name: 'client_id',
            type: 'int',
          },
          {
            name: 'front_server_id',
            type: 'int',
          },
          {
            name: 'back_server_id',
            type: 'int',
          },
          {
            name: 'tenancy_status_id',
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
      true,
    );

    await queryRunner.createForeignKey(
      'tenancies',
      new TableForeignKey({
        columnNames: ['client_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.clients',
      }),
    );

    await queryRunner.createForeignKey(
      'tenancies',
      new TableForeignKey({
        columnNames: ['front_server_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.servers',
      }),
    );

    await queryRunner.createForeignKey(
      'tenancies',
      new TableForeignKey({
        columnNames: ['back_server_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.servers',
      }),
    );

    await queryRunner.createForeignKey(
      'tenancies',
      new TableForeignKey({
        columnNames: ['tenancy_status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.tenancy_status',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tenancies');
  }
}
