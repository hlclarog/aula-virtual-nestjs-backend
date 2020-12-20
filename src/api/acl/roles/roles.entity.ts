import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../../base/base.entity';
import { RolesPermissions } from '../roles_permissions/roles_permissions.entity';
import { UsersRoles } from '../users_roles/users_roles.entity';
import { ROLES_ENTITY } from './roles.dto';

@Entity(ROLES_ENTITY)
export class Roles extends Base {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar' })
  display_name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => RolesPermissions, (rol_permission) => rol_permission.rol)
  permissions_roles: RolesPermissions[];

  @OneToMany(() => UsersRoles, (user_rol) => user_rol.user)
  users_roles: UsersRoles[];
}
