import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { PROGRAM_USERS_ENTITY } from './program_users.dto';
import { Base } from '../../base/base.entity';
import { Users } from '../acl/users/users.entity';
import { EnrollmentStatus } from '../enrollment-status/enrollment-status.entity';
import { EnrollmentTypes } from '../enrollment-types/enrollment-types.entity';
import { Programs } from '../programs/programs.entity';
import { TransactionStatus } from '../transaction_status/transaction_status.entity';

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

  @ManyToOne(
    () => TransactionStatus,
    (transactionStatus) => transactionStatus.program_users,
  )
  @JoinColumn({ name: 'transaction_status_id' })
  transaction_status: TransactionStatus;
  @RelationId((programUsers: ProgramUsers) => programUsers.transaction_status)
  @Column({ type: 'integer' })
  transaction_status_id: number;

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
