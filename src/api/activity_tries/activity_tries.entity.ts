import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { ActivityTryUsers } from '../activity_try_users/activity_try_users.entity';
import { ACTIVITY_TRIES_ENTITY } from './activity_tries.dto';

@Entity(ACTIVITY_TRIES_ENTITY)
export class ActivityTries extends Base {
  @Column({ type: 'bool' }) passed: boolean;

  @Column({ type: 'text' }) answer: string;

  @Column({ type: 'date', nullable: true }) date: string;

  @ManyToOne(
    () => ActivityTryUsers,
    (activivy_try_user) => activivy_try_user.activity_tries,
  )
  @JoinColumn({ name: 'activity_try_user_id' })
  activity_try_user: ActivityTryUsers | number;
  @RelationId(
    (activity_tries: ActivityTries) => activity_tries.activity_try_user,
  )
  activity_try_user_id: number;
}
