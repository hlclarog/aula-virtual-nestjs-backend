import { TenancyConfig } from './../../tenancy_config/tenancy_config.entity';
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

  @Column({ type: 'varchar', default: '' })
  translate: string;

  @OneToMany(() => RolesPermissions, (rol_permission) => rol_permission.rol)
  roles_permissions: RolesPermissions[];

  @OneToMany(() => UsersRoles, (user_rol) => user_rol.rol)
  users_roles: UsersRoles[];

  @OneToMany(
    () => TenancyConfig,
    (tenancy_config) => tenancy_config.rol_default,
  )
  tenancy_config: TenancyConfig[];
}
