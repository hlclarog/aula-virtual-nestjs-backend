import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createOrganizationsCertificatesTable1609908330000
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'organizations_certificates',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'organization_id',
            type: 'int',
          },
          {
            name: 'background',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'background_demo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'content',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sign_text',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sign_picture',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sign_position',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'selected',
            type: 'boolean',
            default: false,
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
    );
    await queryRunner.createForeignKeys('organizations_certificates', [
      new TableForeignKey({
        columnNames: ['organization_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'organizations',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('organizations_certificates');
  }
}
