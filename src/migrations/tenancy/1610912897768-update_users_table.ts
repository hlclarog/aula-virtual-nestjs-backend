import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class updateUsersTable1610912897768 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'lastname',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'picture',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'phone',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'gender',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'linkeid',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'country',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'state',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'city',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'address',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'profile_description',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'facebook',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'google',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'twitter',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'profession',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'zipcode',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'identification_type_id',
        type: 'int',
        isNullable: true,
      }),
      new TableColumn({
        name: 'identification',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'terms_and_conditions',
        type: 'bool',
        isNullable: true,
      }),
      new TableColumn({
        name: 'welcome_message',
        type: 'bool',
        default: true,
      }),
    ]);

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['identification_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.identification_types',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
