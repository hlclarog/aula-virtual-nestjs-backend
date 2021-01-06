import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createClientsTable1609742459872 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clients',
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
            name: 'dni',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'agent_name',
            type: 'varchar',
          },
          {
            name: 'agent_email',
            type: 'varchar',
          },
          {
            name: 'agent_phone',
            type: 'varchar',
          },
          {
            name: 'agent_cellphone',
            type: 'varchar',
          },
          {
            name: 'billing_name',
            type: 'varchar',
          },
          {
            name: 'billing_email',
            type: 'varchar',
          },
          {
            name: 'billing_phone',
            type: 'varchar',
          },
          {
            name: 'billing_cellphone',
            type: 'varchar',
          },
          {
            name: 'identification_type_id',
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
      'clients',
      new TableForeignKey({
        columnNames: ['identification_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.identification_types',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clients');
  }
}
