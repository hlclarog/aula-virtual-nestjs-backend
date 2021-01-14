import { PlanModules } from './../../plan_modules/plan_modules.entity';
import { TenancyModules } from './../../tenancy_modules/tenancy_modules.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  RelationId,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { Base } from '../../../base/base.entity';
import { Permissions } from '../permissions/permissions.entity';
import { MODULES_ENTITY } from './modules.dto';

@Entity({ name: MODULES_ENTITY, schema: 'public' })
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

  @OneToMany(() => PlanModules, (plan_modules) => plan_modules.module)
  plan_modules: PlanModules[];

  @OneToMany(() => TenancyModules, (tenancy_module) => tenancy_module.module)
  tenancy_modules: TenancyModules[];

  @TreeChildren()
  children: Modules[];

  @TreeParent()
  @JoinColumn({ name: 'parent_id' })
  parent: Modules;

  @RelationId((module: Modules) => module.parent)
  parent_id: number;
}
