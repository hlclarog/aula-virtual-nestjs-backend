import { Column, Entity, OneToMany } from 'typeorm';
import { COURSE_STATUS_ENTITY } from './course-status.dto';
import { Base } from '../../base/base.entity';
import { Courses } from '../courses/courses.entity';

@Entity({ name: COURSE_STATUS_ENTITY })
export class CourseStatus extends Base {
  @Column({ type: 'varchar' }) description: string;
  @OneToMany(() => Courses, (courses) => courses.course_status)
  course: Courses[];
}
