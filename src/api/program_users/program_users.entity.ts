import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { PROGRAM_USERS_ENTITY } from './program_users.dto';
import { Base } from '../../base/base.entity';
import { Users } from '../acl/users/users.entity';
import { EnrollmentStatus } from '../enrollment-status/enrollment-status.entity';
import { EnrollmentTypes } from '../enrollment-types/enrollment-types.entity';
import { Programs } from '../programs/programs.entity';
import { TransactionStatus } from '../transaction_status/transaction_status.entity';
import { ProgramPayment } from '../program_payment/program_payment.entity';
import { ProgramUserCourse } from '../program_user_course/program_user_course.entity';

@Entity(PROGRAM_USERS_ENTITY)
export class ProgramUsers extends Base {
  @ManyToOne(() => Programs, (program) => program.program_users)
  @JoinColumn({ name: 'program_id' })
  program: Programs;
  @RelationId((programUsers: ProgramUsers) => programUsers.program)
  @Column({ type: 'integer' })
  program_id: number;

  @ManyToOne(() => Users, (users) => users.program_users)
  @JoinColumn({ name: 'user_id' })
  user: Users;
  @RelationId((programUsers: ProgramUsers) => programUsers.user)
  @Column({ type: 'integer' })
  user_id: number;

  @ManyToOne(
    () => EnrollmentStatus,
    (enrollmentStatus) => enrollmentStatus.program_users,
  )
  @JoinColumn({ name: 'enrollment_status_id' })
  enrollment_status: EnrollmentStatus;
  @RelationId((programUsers: ProgramUsers) => programUsers.enrollment_status)
  @Column({ type: 'integer' })
  enrollment_status_id: number;

  @ManyToOne(
    () => EnrollmentTypes,
    (enrollmentTypes) => enrollmentTypes.program_users,
  )
  @JoinColumn({ name: 'enrollment_type_id' })
  enrollment_type: EnrollmentTypes;
  @RelationId((programUsers: ProgramUsers) => programUsers.enrollment_type)
  @Column({ type: 'integer' })
  enrollment_type_id: number;

  @Column({ type: 'date', nullable: true }) begin_date: string;
  @Column({ type: 'date', nullable: true }) end_date: string;
  @Column({ type: 'varchar', nullable: true }) certificate_file: string;
  @Column({ type: 'varchar', nullable: true })
  certificate_code_validation: string;
  @Column({ type: 'bool', default: false }) favorite: boolean;
  @Column({ type: 'bool', default: false }) downloaded: boolean;

  @OneToMany(() => ProgramUserCourse, (programUserCourse) => programUserCourse.program_user_id)
  program_user: ProgramUserCourse[];
}
