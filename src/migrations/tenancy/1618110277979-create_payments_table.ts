import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { ORGANIZATIONS_ENTITY } from '../../api/organizations/organizations.dto';

export class createPaymentsTable1618110277979 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payments',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'payment_state_id',
            type: 'int',
          },
          {
            name: 'collection_type_id',
            type: 'int',
          },
          {
            name: 'currency_type_id',
            type: 'int',
          },
          {
            name: 'organization_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'collection_file',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'transaction_code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'transaction_reference',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'transaction_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'paid_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'processed_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'quantity',
            type: 'decimal',
            default: 0.0,
            precision: 18,
            scale: 2,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'bank',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'snapshot',
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

    await queryRunner.createForeignKeys('payments', [
      new TableForeignKey({
        columnNames: ['payment_state_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'payment_status',
      }),
      new TableForeignKey({
        columnNames: ['collection_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'collection_types',
      }),
      new TableForeignKey({
        columnNames: ['currency_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'currencies',
      }),
      new TableForeignKey({
        columnNames: ['organization_id'],
        referencedColumnNames: ['id'],
        referencedTableName: ORGANIZATIONS_ENTITY,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('payments');
  }
}
