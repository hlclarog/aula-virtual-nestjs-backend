import {
  Column,
  Entity,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { Base } from '../../../base/base.entity';
import { Permissions } from '../permissions/permissions.entity';
import { MODULES_ENTITY } from './modules.dto';

@Entity(MODULES_ENTITY)
@Tree('materialized-path')
export class Modules extends Base {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  icon: string;

  @Column({ type: 'int' })
  display_order: number;

  @Column({ type: 'boolean' })
  show_in_menu: boolean;

  @Column({ type: 'json' })
  crud: any;

  @Column({ type: 'json' })
  rules: any;

  @OneToMany(() => Permissions, (permissions) => permissions.module)
  permissions: Permissions[];

  @TreeChildren()
  children: Modules[];

  @TreeParent()
  parent: Modules;
}