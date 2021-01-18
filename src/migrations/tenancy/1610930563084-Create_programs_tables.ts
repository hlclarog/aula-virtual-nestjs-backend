import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { ORGANIZATIONS_ENTITY } from '../../api/organizations/organizations.dto';

export class CreateProgramsTables1610930563084 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'program_types',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'description',
            type: 'varchar',
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
    await queryRunner.createTable(
      new Table({
        name: 'program_status',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'description',
            type: 'varchar',
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
    await queryRunner.createTable(
      new Table({
        name: 'programs',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'program_type_id',
            type: 'int',
          },
          {
            name: 'program_status_id',
            type: 'int',
          },
          {
            name: 'organization_id',
            type: 'int',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'shortname',
            type: 'varchar',
          },
          {
            name: 'picture',
            type: 'varchar',
          },
          {
            name: 'video_url',
            type: 'varchar',
          },
          {
            name: 'duration',
            type: 'int',
          },
          {
            name: 'email_to',
            type: 'varchar',
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
    await queryRunner.createForeignKeys('programs', [
      new TableForeignKey({
        columnNames: ['program_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: '',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['program_status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'program_types',
      }),
      new TableForeignKey({
        columnNames: ['organization_id'],
        referencedColumnNames: ['id'],
        referencedTableName: ORGANIZATIONS_ENTITY,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('programs');
    await queryRunner.dropTable('program_status');
    await queryRunner.dropTable('program_types');
  }
}
