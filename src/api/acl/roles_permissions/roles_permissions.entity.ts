import { Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../../base/base.entity';
import { Permissions } from '../permissions/permissions.entity';
import { Roles } from '../roles/roles.entity';
import { ROLES_PERMISSIONS_ENTITY } from './roles_permissions.dto';

@Entity(ROLES_PERMISSIONS_ENTITY)
export class RolesPermissions extends Base {
  @ManyToOne(() => Roles, (rol) => rol.roles_permissions)
  @JoinColumn({ name: 'rol_id' })
  rol: Roles;

  @RelationId((role_permission: RolesPermissions) => role_permission.rol)
  rol_id: number;

  @ManyToOne(() => Permissions, (permission) => permission.roles_permissions, {
    eager: true,
  })
  @JoinColumn({ name: 'permission_id' })
  permission: Permissions;

  @RelationId((role_permission: RolesPermissions) => role_permission.permission)
  permission_id: number;
}
