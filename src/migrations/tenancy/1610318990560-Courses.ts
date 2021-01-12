import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { ORGANIZATIONS_ENTITY } from '../../api/organizations/organizations.dto';
import { USERS_ENTITY } from '../../api/acl/users/users.dto';
import { COURSE_STATUS_ENTITY } from '../../api/course-status/course-status.dto';

export class Courses1610318990560 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'courses',
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
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'short_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'organization_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'course_status_id',
            type: 'int',
          },
          {
            name: 'free',
            type: 'bool',
            default: true,
          },
          {
            name: 'certificable',
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
    await queryRunner.createForeignKeys('courses', [
      new TableForeignKey({
        columnNames: ['organization_id'],
        referencedColumnNames: ['id'],
        referencedTableName: ORGANIZATIONS_ENTITY,
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: USERS_ENTITY,
      }),
      new TableForeignKey({
        columnNames: ['course_status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: COURSE_STATUS_ENTITY,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Courses');
  }
}