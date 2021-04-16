import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Base } from '../../base/base.entity';
import { LESSON_ACTIVITIES_ENTITY } from './lesson_activities.dto';
import { ActivityTypes } from '../activity_types/activity_types.entity';
import { ActivityTryUsers } from '../activity_try_users/activity_try_users.entity';
import { PointsUserLog } from '../points_user_log/points_user_log.entity';
import { Lessons } from '../lessons/lessons.entity';

@Entity(LESSON_ACTIVITIES_ENTITY)
export class LessonActivities extends Base {
  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column('boolean', { default: true, nullable: true })
  visible: boolean;

  @Column('int')
  detail_id: number;

  @ManyToOne(() => Lessons, (lesson) => lesson.lesson_activities)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lessons;
  @RelationId((lessonActivities: LessonActivities) => lessonActivities.lesson)
  @Column('integer')
  lesson_id: number;

  @ManyToOne(
    () => ActivityTypes,
    (activityTypes) => activityTypes.lesson_activities,
  )
  @JoinColumn({ name: 'activity_type_id' })
  activity_type: ActivityTypes;
  @RelationId(
    (lessonActivities: LessonActivities) => lessonActivities.activity_type,
  )
  @Column('integer')
  activity_type_id: number;

  @OneToMany(
    () => ActivityTryUsers,
    (activity_try_user) => activity_try_user.lesson_activity,
  )
  activity_try_users: ActivityTryUsers[];

  @OneToMany(() => PointsUserLog, (point_user_log) => point_user_log.activity)
  points_user_log: PointsUserLog[];
}
