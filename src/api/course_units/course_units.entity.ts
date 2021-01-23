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
import { Lessons } from '../lessons/lessons.entity';

@Entity(COURSE_UNITS_ENTITY)
export class CourseUnits extends Base {
  @ManyToOne(() => Courses, (courses) => courses.course_units)
  @JoinColumn({ name: 'course_id' })
  course: Courses;
  @RelationId((courseUnits: CourseUnits) => courseUnits.course)
  course_id: number;

  @Column({ type: 'varchar' }) description: string;
  @Column({ type: 'varchar' }) color: string;
  @Column({ type: 'int' }) order: number;

  @OneToMany(() => Lessons, (lesson) => lesson.course)
  lessons: Lessons[];
}
