import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { COURSE_UNITS_ENTITY } from './course_units.dto';
import { Base } from '../../base/base.entity';
import { Courses } from '../courses/courses.entity';
import { CourseLessons } from '../course_lessons/course_lessons.entity';

@Entity(COURSE_UNITS_ENTITY)
export class CourseUnits extends Base {
  @ManyToOne(() => Courses, (courses) => courses.course_units)
  @JoinColumn({ name: 'course_id' })
  course: Courses;
  @RelationId((courseUnits: CourseUnits) => courseUnits.course)
  @Column({ type: 'integer' })
  course_id: number;

  @Column({ type: 'varchar' }) description: string;
  @Column({ type: 'varchar' }) color: string;
  @Column({ type: 'int' }) order: number;

  @OneToMany(() => CourseLessons, (course_lesson) => course_lesson.course_unit)
  course_lessons: CourseLessons[];
}
