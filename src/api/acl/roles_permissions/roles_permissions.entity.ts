import { Entity, ManyToOne, Tree } from 'typeorm';
import { Base } from '../../../base/base.entity';
import { Permissions } from '../permissions/permissions.entity';
import { Roles } from '../roles/roles.entity';
import { ROLES_PERMISSIONS_ENTITY } from './roles_permissions.dto';

@Entity(ROLES_PERMISSIONS_ENTITY)
@Tree('materialized-path')
export class RolesPermissions extends Base {
  @ManyToOne(() => Roles, (rol) => rol.permissions)
  rol: Roles;

  @ManyToOne(() => Permissions, (permission) => permission.roles, {
    eager: true,
  })
  permission: Permissions;
}
