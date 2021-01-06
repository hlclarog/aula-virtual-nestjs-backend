import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createServersTable1609742110797 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'servers',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'ip_public',
            type: 'varchar',
          },
          {
            name: 'ip_address',
            type: 'varchar',
          },
          {
            name: 'name_server',
            type: 'varchar',
          },
          {
            name: 'user',
            type: 'varchar',
          },
          {
            name: 'pass',
            type: 'varchar',
          },
          {
            name: 'ssh_key',
            type: 'varchar',
          },
          {
            name: 'server_type_id',
            type: 'int',
          },
          {
            name: 'connection_type_id',
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
      'servers',
      new TableForeignKey({
        columnNames: ['server_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.server_types',
      }),
    );

    await queryRunner.createForeignKey(
      'servers',
      new TableForeignKey({
        columnNames: ['connection_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.connection_types',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('servers');
  }
}
