import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from '../../../base/base.entity';
import { Roles } from '../roles/roles.entity';
import { Users } from '../users/users.entity';
import { USERS_ROLES_ENTITY } from './users_roles.dto';

@Entity(USERS_ROLES_ENTITY)
export class UsersRoles extends Base {
  @ManyToOne(() => Users, (user) => user.users_roles)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Roles, (rol) => rol.users_roles)
  @JoinColumn({ name: 'rol_id' })
  rol: Roles;

  @Column({ type: 'boolean', default: false })
  default: boolean;
}
