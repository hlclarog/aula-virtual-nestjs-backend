import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createEmailActivitiesTemplateTable1609777718591
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'email_activities_template',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'subject',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'body',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'observations',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'email_template_id',
            type: 'int',
          },
          {
            name: 'email_activity_id',
            type: 'int',
          },
          {
            name: 'tenancy_email_id',
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
      'email_activities_template',
      new TableForeignKey({
        columnNames: ['email_template_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'email_templates',
      }),
    );

    await queryRunner.createForeignKey(
      'email_activities_template',
      new TableForeignKey({
        columnNames: ['email_activity_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.email_activities',
      }),
    );

    await queryRunner.createForeignKey(
      'email_activities_template',
      new TableForeignKey({
        columnNames: ['tenancy_email_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.tenancy_emails',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('email_activities_template');
  }
}
