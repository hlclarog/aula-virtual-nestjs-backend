import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { Base } from '../../../base/base.entity';
import { Modules } from '../modules/modules.entity';
import { RolesPermissions } from '../roles_permissions/roles_permissions.entity';
import { PERMISSIONS_ENTITY } from './permissions.dto';

@Entity(PERMISSIONS_ENTITY)
export class Permissions extends Base {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar' })
  display_name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Modules, (modules) => modules.permissions, { eager: true })
  module: Modules;

  @RelationId((permission: Permissions) => permission.module)
  module_id: number;

  @OneToMany(
    () => RolesPermissions,
    (rol_permission) => rol_permission.permission,
  )
  roles_permissions: RolesPermissions[];
}
