import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { PROGRAM_USER_COURSE_ENTITY } from './program_user_course.dto';
import { Base } from '../../base/base.entity';
import { ProgramUsers } from '../program_users/program_users.entity';
import { CourseUsers } from '../course-users/course-users.entity';

@Entity({ name: PROGRAM_USER_COURSE_ENTITY })
export class ProgramUserCourse extends Base {
  @ManyToOne(() => ProgramUsers, (programUsers) => programUsers.program_user)
  @JoinColumn({ name: 'program_user_id' }) programUsers: ProgramUsers;
  @RelationId((program_user_course: ProgramUserCourse) => program_user_course.programUsers)
  @Column({ type: 'int' }) program_user_id: number;

  @ManyToOne(() => CourseUsers, (courseUsers) => courseUsers.program_user)
  @JoinColumn({ name: 'course_user_id' }) courseUsers: CourseUsers;
  @RelationId((program_user_course: ProgramUserCourse) => program_user_course.courseUsers)
  @Column({ type: 'int' }) course_user_id: number;

  @Column({ type: 'int', nullable: true }) credits?: number;
  @Column({ type: 'bool', default: false }) homologue: boolean;
}
