import { Inject } from '@nestjs/common';
import { MODULES_PROVIDER } from 'src/api/acl/modules/modules.dto';
import { Modules } from 'src/api/acl/modules/modules.entity';
import { BaseRepo } from 'src/base/base-repo';
import { MigrationInterface, QueryRunner } from 'typeorm';

const rolesDefaults = [
  {
    parent: null,
    name: 'Campus',
    icon: '',
    display_order: 1,
    show_in_menu: true,
    crud: {},
    rules: {},
  },
  {
    parent: null,
    name: 'Facultad',
    icon: '',
    display_order: 2,
    show_in_menu: true,
    crud: {},
    rules: {},
  },
];

export class seedMetadataTests1608090740563 implements MigrationInterface {
  @Inject(MODULES_PROVIDER) repository: BaseRepo<Modules>;
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.getRepository('modules').save(rolesDefaults);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
