import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { COURSE_LESSONS_ENTITY } from './course_lessons.dto';
import { Base } from '../../base/base.entity';
import { Courses } from '../courses/courses.entity';
import { Lessons } from '../lessons/lessons.entity';
import { CourseUnits } from '../course_units/course_units.entity';
import { LessonDetails } from '../lesson_details/lesson_details.entity';
import { LessonScorms } from '../lesson_scorms/lesson_scorms.entity';
import { LessonScormIntents } from '../lesson_scorm_intents/lesson_scorm_intents.entity';
import { LessonActivities } from '../lesson_activities/lesson_activities.entity';
import { LessonTryUsers } from '../lesson_try_users/lesson_try_users.entity';
import { LessonComments } from '../lesson_comments/lesson_comments.entity';
import { PointsUserLog } from '../points_user_log/points_user_log.entity';

@Entity(COURSE_LESSONS_ENTITY)
export class CourseLessons extends Base {
  @ManyToOne(() => Courses, (courses) => courses.course_lessons)
  @JoinColumn({ name: 'course_id' })
  course: Courses;
  @RelationId((courseLessons: CourseLessons) => courseLessons.course)
  @Column({ type: 'integer' })
  course_id: number;

  @ManyToOne(() => Lessons, (lesson) => lesson.course_lessons)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lessons;
  @RelationId((courseLessons: CourseLessons) => courseLessons.lesson)
  @Column({ type: 'integer' })
  lesson_id: number;

  @ManyToOne(() => CourseUnits, (course_unit) => course_unit.course_lessons)
  @JoinColumn({ name: 'course_unit_id' })
  course_unit: CourseUnits;
  @RelationId((courseLessons: CourseLessons) => courseLessons.course_unit)
  @Column({ type: 'integer' })
  course_unit_id: number;

  @OneToMany(() => Lessons, (lesson) => lesson.course_lessons)
  lessons: Lessons[];

  @Column({ type: 'int', nullable: true }) order: number;
  ////////////////////

  @OneToMany(
    () => LessonDetails,
    (lesson_detail) => lesson_detail.course_lesson,
  )
  lesson_details: LessonDetails[];

  @OneToMany(() => LessonScorms, (lesson_scorm) => lesson_scorm.course_lesson)
  lesson_scorms: LessonScorms[];

  @OneToMany(
    () => LessonScormIntents,
    (lesson_scorm_intent) => lesson_scorm_intent.course_lesson,
  )
  lesson_scorm_intents: LessonScormIntents[];
  @OneToMany(
    () => LessonActivities,
    (lesson_activities) => lesson_activities.course_lesson,
  )
  lesson_activities: LessonActivities[];

  @OneToMany(
    () => LessonTryUsers,
    (lesson_try_user) => lesson_try_user.course_lesson,
  )
  lesson_try_users: LessonTryUsers[];

  @OneToMany(
    () => LessonComments,
    (lesson_comment) => lesson_comment.course_lesson,
  )
  lesson_comments: LessonComments[];

  @OneToMany(
    () => PointsUserLog,
    (point_user_log) => point_user_log.course_lesson,
  )
  points_user_log: PointsUserLog[];
}
