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
import { Courses } from '../courses/courses.entity';
import { LessonTypes } from '../lesson_types/lesson_types.entity';
import { CourseUnits } from '../course_units/course_units.entity';
import { LessonDetails } from '../lesson_details/lesson_details.entity';
import { LessonActivities } from '../lesson_activities/lesson_activities.entity';

@Entity(COURSE_UNITS_ENTITY)
export class Lessons extends Base {
  @ManyToOne(() => Courses, (courses) => courses.lessons, { eager: true })
  @JoinColumn({ name: 'course_id' })
  course: Courses | number;
  @RelationId((lessons: Lessons) => lessons.course)
  course_id: number;

  @ManyToOne(() => LessonTypes, (lesson_type) => lesson_type.lessons, {
    eager: true,
  })
  @JoinColumn({ name: 'lesson_type_id' })
  lesson_type: LessonTypes | number;
  @RelationId((lessons: Lessons) => lessons.lesson_type)
  lesson_type_id: number;

  @ManyToOne(() => CourseUnits, (course_unit) => course_unit.lessons, {
    eager: true,
  })
  @JoinColumn({ name: 'course_unit_id' })
  course_unit: CourseUnits | number;
  @RelationId((courses: Lessons) => courses.course_unit)
  course_unit_id: number;

  @Column({ type: 'varchar' }) name: string;
  @Column({ type: 'varchar' }) description: string;
  @Column({ type: 'varchar' }) video_url: string;
  @Column({ type: 'varchar' }) content: string;
  @Column({ type: 'int', default: 100 }) min_progress: number;
  @Column({ type: 'int' }) order: number;
  @Column({ type: 'int' }) duration: number;
  @Column({ type: 'int' }) suggested_weeks: number;
  @Column({ type: 'boolean', default: true }) visible: boolean;

  @OneToMany(() => LessonDetails, (lesson_detail) => lesson_detail.lesson)
  lesson_details: LessonDetails[];
  @OneToMany(
    () => LessonActivities,
    (lesson_activities) => lesson_activities.lesson,
  )
  lesson_activities: LessonActivities[];
}
