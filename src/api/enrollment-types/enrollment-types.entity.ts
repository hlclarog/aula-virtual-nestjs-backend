import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { ENROLLMENT_TYPES_ENTITY } from './enrollment-types.dto';
import { CourseUsers } from '../course-users/course-users.entity';
import { ProgramUsers } from '../program_users/program_users.entity';

@Entity(ENROLLMENT_TYPES_ENTITY)
export class EnrollmentTypes extends Base {
  @Column({ type: 'varchar' }) description: string;

  @OneToMany(() => CourseUsers, (courseUsers) => courseUsers.enrollment_type)
  course_users: CourseUsers[];

  @OneToMany(() => ProgramUsers, (programUsers) => programUsers.enrollment_type)
  program_users: ProgramUsers[];
}
