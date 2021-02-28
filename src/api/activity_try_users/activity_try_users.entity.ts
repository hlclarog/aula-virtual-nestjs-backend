import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Base } from '../../base/base.entity';
import { ACTIVITY_TRY_USERS_ENTITY } from './activity_try_users.dto';
import { Users } from '../acl/users/users.entity';
import { LessonActivities } from '../lesson_activities/lesson_activities.entity';
import { ActivityTries } from '../activity_tries/activity_tries.entity';

@Entity(ACTIVITY_TRY_USERS_ENTITY)
export class ActivityTryUsers extends Base {
  @Column({ type: 'date' }) begin: string;

  @Column({ type: 'date', nullable: true }) end: string;

  @ManyToOne(() => Users, (user) => user.activity_try_users)
  @JoinColumn({ name: 'user_id' })
  user: Users;
  @RelationId((activity_try_users: ActivityTryUsers) => activity_try_users.user)
  @Column({ type: 'integer' })
  user_id: number;

  @ManyToOne(
    () => LessonActivities,
    (lesson_activity) => lesson_activity.activity_try_users,
  )
  @JoinColumn({ name: 'lesson_activity_id' })
  lesson_activity: LessonActivities;
  @RelationId(
    (activity_try_users: ActivityTryUsers) =>
      activity_try_users.lesson_activity,
  )
  @Column({ type: 'integer' })
  lesson_activity_id: number;

  @OneToMany(
    () => ActivityTries,
    (activity_try) => activity_try.activity_try_user,
  )
  activity_tries: ActivityTries[];
}
