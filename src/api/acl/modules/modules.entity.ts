import {
  Column,
  Entity,
  OneToMany,
  RelationId,
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

  @Column({ type: 'varchar', default: '/' })
  path: string;

  @Column({ type: 'varchar', default: '' })
  translate: string;

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

  @RelationId((module: Modules) => module.parent)
  parent_id: number;
}
