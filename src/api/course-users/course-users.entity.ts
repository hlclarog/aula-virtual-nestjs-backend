import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { COURSE_USERS_ENTITY } from './course-users.dto';
import { Base } from '../../base/base.entity';
import { Users } from '../acl/users/users.entity';
import { EnrollmentStatus } from '../enrollment-status/enrollment-status.entity';
import { EnrollmentTypes } from '../enrollment-types/enrollment-types.entity';
import { Courses } from '../courses/courses.entity';

@Entity(COURSE_USERS_ENTITY)
export class CourseUsers extends Base {
  @ManyToOne(() => Courses, (courses) => courses.course_users)
  @JoinColumn({ name: 'course_id' })
  course: Courses | number;

  @RelationId((courseUsers: CourseUsers) => courseUsers.course)
  course_id: number;

  @ManyToOne(() => Users, (users) => users.course_users)
  @JoinColumn({ name: 'user_id' })
  user: Users | number;

  @RelationId((courseUsers: CourseUsers) => courseUsers.user)
  user_id: number;

  @ManyToOne(
    () => EnrollmentStatus,
    (enrollmentStatus) => enrollmentStatus.course_users,
  )
  @JoinColumn({ name: 'enrollment_status_id' })
  enrollment_status: EnrollmentStatus | number;

  @RelationId((courseUsers: CourseUsers) => courseUsers.enrollment_status)
  enrollment_status_id: number;

  @ManyToOne(
    () => EnrollmentTypes,
    (enrollmentTypes) => enrollmentTypes.course_users,
  )
  @JoinColumn({ name: 'enrollment_type_id' })
  enrollment_type: EnrollmentTypes | number;

  @RelationId((courseUsers: CourseUsers) => courseUsers.enrollment_type)
  enrollment_type_id: number;

  @Column({ type: 'date', nullable: true }) begin_date: string;
  @Column({ type: 'date', nullable: true }) end_date: string;
  @Column({ type: 'varchar', nullable: true }) ref_transaction: string;
  @Column({ type: 'varchar', nullable: true }) certificate_file: string;
  @Column({ type: 'varchar', nullable: true })
  certificate_code_validation: string;
  @Column({ type: 'bool', default: false }) private_inscription: boolean;
  @Column({ type: 'bool', default: false }) favorite: boolean;
  @Column({ type: 'bool', default: false }) downloaded: boolean;
  @Column({ type: 'decimal', nullable: true, default: 0.0 }) paid_value: number;
}
