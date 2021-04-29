import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createSlidersTable1619650430156 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sliders',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'banner_id',
            type: 'int',
          },
          {
            name: 'content',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'link',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'image',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'order',
            type: 'int',
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

    await queryRunner.createForeignKey(
      'sliders',
      new TableForeignKey({
        columnNames: ['banner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'banners',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sliders');
  }
}
