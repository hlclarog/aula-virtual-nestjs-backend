import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class oauth2ClientsTable1609502400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'gb_oauth_client',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: false,
          },
          {
            name: 'name',
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
            name: 'grants',
            type: 'text',
          },
          {
            name: 'scope',
            type: 'varchar',
            length: '500',
          },
          {
            name: 'access_token_lifetime',
            type: 'integer',
          },
          {
            name: 'refresh_token_lifetime',
            type: 'integer',
          },
          {
            name: 'privateKey',
            type: 'text',
          },
          {
            name: 'publicKey',
            type: 'text',
          },
          {
            name: 'cert',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'cert_expires_at',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('gb_oauth_client');
  }
}
