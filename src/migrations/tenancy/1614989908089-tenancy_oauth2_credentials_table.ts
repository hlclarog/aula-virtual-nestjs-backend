import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class tenancyOauth2CredentialsTable1614989908089
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tenancy_oauth2_credentials',
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
            name: 'integration_type_id',
            type: 'int',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'client_id',
            type: 'text',
          },
          {
            name: 'client_secret',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'scope',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'private_key',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'public_key',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'callback_url',
            type: 'text',
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

    await queryRunner.createForeignKey(
      'tenancy_oauth2_credentials',
      new TableForeignKey({
        columnNames: ['tenancy_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.tenancies',
      }),
    );
    await queryRunner.createForeignKey(
      'tenancy_oauth2_credentials',
      new TableForeignKey({
        columnNames: ['integration_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.integration_types',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tenancy_oauth2_credentials');
  }
}
