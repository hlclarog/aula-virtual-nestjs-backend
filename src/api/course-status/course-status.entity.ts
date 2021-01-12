import { Column, Entity, OneToMany } from 'typeorm';
import { COURSE_STATUS_ENTITY } from './course-status.dto';
import { Base } from '../../base/base.entity';
import { Course } from '../courses/course.entity';

@Entity({ name: COURSE_STATUS_ENTITY })
export class CourseStatus extends Base {
  @Column({ type: 'varchar' }) description: string;
  @OneToMany(() => Course, (course) => course.course_status )
  course: Course[];
}
