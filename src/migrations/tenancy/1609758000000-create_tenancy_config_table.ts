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
            name: 'tenancy_email_default_id',
            isNullable: true,
            type: 'int',
          },
          {
            name: 'language_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'web_client_oauth',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'short_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'message_welcome',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'image_small',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'image_big',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'allow_registration',
            type: 'bool',
            default: true,
          },
          {
            name: 'initial_points',
            type: 'int',
            default: 0,
          },
          {
            name: 'initial_lives',
            type: 'int',
            default: 0,
          },
          {
            name: 'limit_lives',
            type: 'int',
            default: 0,
          },
          {
            name: 'image_lives',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'image_points',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'bar_span_days',
            type: 'int',
            default: 0,
          },
          {
            name: 'bar_expected_points',
            type: 'int',
            default: 0,
          },
          {
            name: 'unenroll_reset',
            type: 'bool',
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

    await queryRunner.createForeignKey(
      'tenancy_config',
      new TableForeignKey({
        columnNames: ['tenancy_email_default_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.tenancy_emails',
      }),
    );

    await queryRunner.createForeignKey(
      'tenancy_config',
      new TableForeignKey({
        columnNames: ['language_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.languages',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tenancy_config');
  }
}
