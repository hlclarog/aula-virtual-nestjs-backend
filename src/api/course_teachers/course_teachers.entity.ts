import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { COURSE_TEACHERS_ENTITY } from './course_teachers.dto';
import { Base } from '../../base/base.entity';
import { Users } from '../acl/users/users.entity';
import { Courses } from '../courses/courses.entity';

@Entity(COURSE_TEACHERS_ENTITY)
export class CourseTeachers extends Base {
  @ManyToOne(() => Courses, (courses) => courses.course_teachers)
  @JoinColumn({ name: 'course_id' })
  course: Courses;

  @RelationId((courseTeachers: CourseTeachers) => courseTeachers.course)
  @Column({ type: 'integer' })
  course_id: number;

  @ManyToOne(() => Users, (users) => users.course_teachers)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @RelationId((courseTeachers: CourseTeachers) => courseTeachers.user)
  @Column({ type: 'integer' })
  user_id: number;
}
