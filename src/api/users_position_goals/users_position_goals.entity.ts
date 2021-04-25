import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Users } from '../acl/users/users.entity';
import { Positions } from '../positions/positions.entity';
import { USERS_POSITION_GOALS_ENTITY } from './users_position_goals.dto';

@Entity({ name: USERS_POSITION_GOALS_ENTITY })
export class UsersPositionGoals extends Base {
  @ManyToOne(() => Users, (user) => user.users_position_goals)
  @JoinColumn({ name: 'user_id' })
  user: Users;
  @RelationId(
    (usersPositionGoals: UsersPositionGoals) => usersPositionGoals.user,
  )
  @Column('integer')
  user_id: number;

  @ManyToOne(() => Positions, (position) => position.users_position_goals)
  @JoinColumn({ name: 'position_id' })
  position: Positions;
  @RelationId(
    (usersPositionGoals: UsersPositionGoals) => usersPositionGoals.position,
  )
  @Column('integer')
  position_id: number;
}
