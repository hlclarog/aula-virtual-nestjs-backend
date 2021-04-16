import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Users } from '../acl/users/users.entity';
import { Organizations } from '../organizations/organizations.entity';
import { USERS_ORGANIZATIONS_ENTITY } from './users_organizations.dto';

@Entity({ name: USERS_ORGANIZATIONS_ENTITY })
export class UsersOrganizations extends Base {
  @ManyToOne(() => Users, (user) => user.users_organizations)
  @JoinColumn({ name: 'user_id' })
  user: Users;
  @RelationId(
    (usersOrganizations: UsersOrganizations) => usersOrganizations.user,
  )
  @Column('integer')
  user_id: number;

  @ManyToOne(
    () => Organizations,
    (organization) => organization.users_organizations,
  )
  @JoinColumn({ name: 'organization_id' })
  organization: Organizations;
  @RelationId(
    (usersOrganizations: UsersOrganizations) => usersOrganizations.organization,
  )
  @Column('integer')
  organization_id: number;
}
