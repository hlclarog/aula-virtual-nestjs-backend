import { Column, Entity, OneToMany } from 'typeorm';
import { ENROLLMENT_STATUS_ENTITY } from './enrollment-status.dto';
import { Base } from '../../base/base.entity';
import { CourseUsers } from '../course-users/course-users.entity';
import { ProgramUsers } from '../program_users/program_users.entity';

@Entity(ENROLLMENT_STATUS_ENTITY)
export class EnrollmentStatus extends Base {
  @Column({ type: 'varchar' }) description: string;

  @OneToMany(() => CourseUsers, (courseUsers) => courseUsers.enrollment_status)
  course_users: CourseUsers[];

  @OneToMany(
    () => ProgramUsers,
    (programUsers) => programUsers.enrollment_status,
  )
  program_users: ProgramUsers[];
}
