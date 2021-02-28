import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Base } from '../../../base/base.entity';
import { Modules } from '../modules/modules.entity';
import { RolesPermissions } from '../roles_permissions/roles_permissions.entity';
import { PERMISSIONS_ENTITY } from './permissions.dto';

@Entity({ name: PERMISSIONS_ENTITY, schema: 'public' })
export class Permissions extends Base {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar' })
  display_name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Modules, (modules) => modules.permissions)
  @JoinColumn({ name: 'module_id' })
  module: Modules;

  @RelationId((permission: Permissions) => permission.module)
  @Column({ type: 'integer' })
  module_id: number;

  @OneToMany(
    () => RolesPermissions,
    (rol_permission) => rol_permission.permission,
  )
  roles_permissions: RolesPermissions[];
}
