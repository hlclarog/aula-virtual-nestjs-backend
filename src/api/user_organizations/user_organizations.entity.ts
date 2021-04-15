import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Users } from '../acl/users/users.entity';
import { Organizations } from '../organizations/organizations.entity';
import { USER_ORGANIZATIONS_ENTITY } from './user_organizations.dto';

@Entity({ name: USER_ORGANIZATIONS_ENTITY })
export class UserOrganizations extends Base {
  @ManyToOne(() => Users, (user) => user.user_organizations)
  @JoinColumn({ name: 'user_id' })
  user: Users;
  @RelationId((userOrganizations: UserOrganizations) => userOrganizations.user)
  @Column('integer')
  user_id: number;

  @ManyToOne(
    () => Organizations,
    (organization) => organization.user_organizations,
  )
  @JoinColumn({ name: 'organization_id' })
  organization: Organizations;
  @RelationId(
    (userOrganizations: UserOrganizations) => userOrganizations.organization,
  )
  @Column('integer')
  organization_id: number;
}
