import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createPositionCompetencesTable1619380146408
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'position_competences',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'position_id',
            type: 'int',
          },
          {
            name: 'competence_id',
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
      'position_competences',
      new TableForeignKey({
        columnNames: ['competence_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'competences',
      }),
    );

    await queryRunner.createForeignKey(
      'position_competences',
      new TableForeignKey({
        columnNames: ['position_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'positions',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('position_competences');
  }
}
