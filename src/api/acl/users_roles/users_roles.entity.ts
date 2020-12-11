import { Entity, ManyToOne, Tree } from 'typeorm';
import { Base } from '../../../base/base.entity';
import { Roles } from '../roles/roles.entity';
import { Users } from '../users/users.entity';
import { USERS_ROLES_ENTITY } from './users_roles.dto';

@Entity(USERS_ROLES_ENTITY)
@Tree('materialized-path')
export class UsersRoles extends Base {
  @ManyToOne(() => Users, (user) => user.roles, {
    eager: true,
  })
  user: Users;

  @ManyToOne(() => Roles, (rol) => rol.users)
  rol: Roles;
}
