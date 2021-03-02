import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class oauth2AccessTokenTable1609506000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'gb_oauth_access_token',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: false,
          },
          {
            name: 'access_token',
            type: 'varchar',
            length: '80',
          },
          {
            name: 'refresh_token',
            type: 'varchar',
            length: '80',
          },
          {
            name: 'access_token_expires_at',
            type: 'timestamp',
          },
          {
            name: 'refresh_token_expires_at',
            type: 'timestamp',
          },
          {
            name: 'userId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'scope',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'created_on',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'created_from',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'client_id',
            type: 'text',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('gb_oauth_access_token');
  }
}
