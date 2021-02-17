import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../../base/base.entity';
import { Roles } from '../roles/roles.entity';
import { Users } from '../users/users.entity';
import { USERS_ROLES_ENTITY } from './users_roles.dto';

@Entity(USERS_ROLES_ENTITY)
export class UsersRoles extends Base {
  @ManyToOne(() => Users, (user) => user.users_roles)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @RelationId((users_roles: UsersRoles) => users_roles.user)
  @Column()
  user_id: number;

  @ManyToOne(() => Roles, (rol) => rol.users_roles)
  @JoinColumn({ name: 'rol_id' })
  rol: Roles;

  @RelationId((users_roles: UsersRoles) => users_roles.rol)
  @Column()
  rol_id: number;

  @Column({ type: 'boolean', default: false })
  default: boolean;
}
