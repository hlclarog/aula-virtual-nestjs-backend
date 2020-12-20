import { Entity, ManyToOne, RelationId, Tree } from 'typeorm';
import { Base } from '../../../base/base.entity';
import { Roles } from '../roles/roles.entity';
import { Users } from '../users/users.entity';
import { USERS_ROLES_ENTITY } from './users_roles.dto';

@Entity(USERS_ROLES_ENTITY)
@Tree('materialized-path')
export class UsersRoles extends Base {
  @ManyToOne(() => Users, (user) => user.users_roles)
  user: Users;

  @RelationId((users_roles: UsersRoles) => users_roles.user)
  user_id: number;

  @ManyToOne(() => Roles, (rol) => rol.users_roles)
  rol: Roles;

  @RelationId((users_roles: UsersRoles) => users_roles.rol)
  rol_id: number;
}
