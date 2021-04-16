import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { COURSE_USERS_ENTITY } from './course-users.dto';
import { Base } from '../../base/base.entity';
import { Users } from '../acl/users/users.entity';
import { EnrollmentStatus } from '../enrollment-status/enrollment-status.entity';
import { EnrollmentTypes } from '../enrollment-types/enrollment-types.entity';
import { Courses } from '../courses/courses.entity';
import { ProgramUserCourse } from '../program_user_course/program_user_course.entity';

@Entity(COURSE_USERS_ENTITY)
export class CourseUsers extends Base {
  @ManyToOne(() => Courses, (courses) => courses.course_users)
  @JoinColumn({ name: 'course_id' })
  course: Courses;

  @RelationId((courseUsers: CourseUsers) => courseUsers.course)
  @Column({ type: 'integer' })
  course_id: number;

  @ManyToOne(() => Users, (users) => users.course_users)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @RelationId((courseUsers: CourseUsers) => courseUsers.user)
  @Column({ type: 'integer' })
  user_id: number;

  @ManyToOne(
    () => EnrollmentStatus,
    (enrollmentStatus) => enrollmentStatus.course_users,
  )
  @JoinColumn({ name: 'enrollment_status_id' })
  enrollment_status: EnrollmentStatus;

  @RelationId((courseUsers: CourseUsers) => courseUsers.enrollment_status)
  @Column({ type: 'integer' })
  enrollment_status_id: number;

  @ManyToOne(
    () => EnrollmentTypes,
    (enrollmentTypes) => enrollmentTypes.course_users,
  )
  @JoinColumn({ name: 'enrollment_type_id' })
  enrollment_type: EnrollmentTypes;

  @RelationId((courseUsers: CourseUsers) => courseUsers.enrollment_type)
  @Column({ type: 'integer' })
  enrollment_type_id: number;

  @Column({ type: 'date', nullable: true }) begin_date: string;
  @Column({ type: 'date', nullable: true }) end_date: string;
  @Column({ type: 'varchar', nullable: true }) certificate_file: string;
  @Column({ type: 'varchar', nullable: true }) certificate_code_validation: string;
  @Column({ type: 'bool', default: false }) favorite: boolean;
  @Column({ type: 'integer', default: 0 }) score: number;
  @Column({ type: 'bool', default: false }) downloaded: boolean;

  @OneToMany(() => ProgramUserCourse, (programUserCourse) => programUserCourse.program_user_id)
  program_user: ProgramUserCourse[];
}
