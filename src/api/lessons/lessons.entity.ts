import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { COURSE_UNITS_ENTITY } from './lessons.dto';
import { Base } from '../../base/base.entity';
import { LessonTypes } from '../lesson_types/lesson_types.entity';
import { CourseLessons } from '../course_lessons/course_lessons.entity';
import { LessonPermissionTypes } from '../lesson_permission_types/lesson_permission_types.entity';
import { Users } from '../acl/users/users.entity';
import { LessonDetails } from '../lesson_details/lesson_details.entity';
import { LessonScorms } from '../lesson_scorms/lesson_scorms.entity';
import { LessonActivities } from '../lesson_activities/lesson_activities.entity';

@Entity(COURSE_UNITS_ENTITY)
export class Lessons extends Base {
  @ManyToOne(() => LessonTypes, (lesson_type) => lesson_type.lessons)
  @JoinColumn({ name: 'lesson_type_id' })
  lesson_type: LessonTypes;
  @RelationId((lessons: Lessons) => lessons.lesson_type)
  @Column('integer')
  lesson_type_id: number;

  @ManyToOne(
    () => LessonPermissionTypes,
    (lesson_permission_type) => lesson_permission_type.lessons,
  )
  @JoinColumn({ name: 'lesson_permission_type_id' })
  lesson_permission_type: LessonPermissionTypes;
  @RelationId((lessons: Lessons) => lessons.lesson_permission_type)
  @Column('integer')
  lesson_permission_type_id: number;

  @ManyToOne(() => Users, (user) => user.lessons)
  @JoinColumn({ name: 'user_id' })
  user: Users;
  @RelationId((lesson: Lessons) => lesson.user)
  @Column('integer')
  user_id: number;

  @Column({ type: 'varchar' }) name: string;
  @Column({ type: 'varchar', nullable: true }) description: string;
  @Column({ type: 'varchar', nullable: true }) video_url: string;
  @Column({ type: 'varchar', nullable: true }) content: string;
  @Column({ type: 'int', default: 100, nullable: true }) min_progress: number;
  @Column({ type: 'int' }) duration: number;
  @Column({ type: 'int' }) suggested_weeks: number;
  @Column({ type: 'boolean', default: true, nullable: true }) visible: boolean;

  @OneToMany(() => CourseLessons, (course_lesson) => course_lesson.lesson)
  course_lessons: CourseLessons[];

  @OneToMany(() => LessonDetails, (lesson_detail) => lesson_detail.lesson)
  lesson_details: LessonDetails[];

  @OneToMany(() => LessonScorms, (lesson_scorm) => lesson_scorm.lesson)
  lesson_scorms: LessonScorms[];

  @OneToMany(
    () => LessonActivities,
    (lesson_activities) => lesson_activities.lesson,
  )
  lesson_activities: LessonActivities[];
}
