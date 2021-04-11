import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Users } from '../acl/users/users.entity';
import { Courses } from '../courses/courses.entity';
import { CourseLessons } from '../course_lessons/course_lessons.entity';
import { LessonActivities } from '../lesson_activities/lesson_activities.entity';
import { PointReasons } from '../point_reasons/point_reasons.entity';
import { POINTS_USER_LOG_ENTITY } from './points_user_log.dto';

@Entity({ name: POINTS_USER_LOG_ENTITY })
export class PointsUserLog extends Base {
  @ManyToOne(() => Users, (user) => user.points_user_log)
  @JoinColumn({ name: 'user_id' })
  user: Users;
  @RelationId((points_user_log: PointsUserLog) => points_user_log.user)
  @Column({ type: 'integer' })
  user_id: number;

  @ManyToOne(() => PointReasons, (point_reason) => point_reason.points_user_log)
  @JoinColumn({ name: 'point_reason_id' })
  point_reason: PointReasons;
  @RelationId((points_user_log: PointsUserLog) => points_user_log.point_reason)
  @Column({ type: 'integer' })
  point_reason_id: number;

  @Column({ type: 'decimal', default: 0.0 })
  points: number;

  @ManyToOne(() => Courses, (course) => course.points_user_log)
  @JoinColumn({ name: 'course_id' })
  course: Courses;
  @RelationId((points_user_log: PointsUserLog) => points_user_log.course)
  @Column({ type: 'integer' })
  course_id: number;

  @ManyToOne(
    () => CourseLessons,
    (course_lesson) => course_lesson.points_user_log,
  )
  @JoinColumn({ name: 'course_lesson_id' })
  course_lesson: CourseLessons;
  @RelationId((points_user_log: PointsUserLog) => points_user_log.course_lesson)
  @Column('integer')
  course_lesson_id: number;

  @ManyToOne(
    () => LessonActivities,
    (lesson_activity) => lesson_activity.points_user_log,
  )
  @JoinColumn({ name: 'activity_id' })
  activity: LessonActivities;
  @RelationId((points_user_log: PointsUserLog) => points_user_log.activity)
  @Column({ type: 'integer' })
  activity_id: number;
}
