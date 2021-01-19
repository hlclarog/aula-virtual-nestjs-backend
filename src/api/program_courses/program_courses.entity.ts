import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Users } from '../acl/users/users.entity';
import { Programs } from '../programs/programs.entity';
import { TransactionStatus } from '../transaction_status/transaction_status.entity';
import { PROGRAM_COURSES_ENTITY } from './program_courses.dto';

@Entity({ name: PROGRAM_COURSES_ENTITY })
export class ProgramCourses extends Base {
  @ManyToOne(() => Users, (users) => users.program_courses, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: Users;
  @RelationId((programCourses: ProgramCourses) => programCourses.user)
  user_id: number;

  @ManyToOne(() => Programs, (programs) => programs.program_courses, {
    eager: true,
  })
  @JoinColumn({ name: 'program_id' })
  program: Programs;
  @RelationId((programCourses: ProgramCourses) => programCourses.program)
  program_id: number;

  @ManyToOne(
    () => TransactionStatus,
    (transaction_status) => transaction_status.program_courses,
    { eager: true },
  )
  @JoinColumn({ name: 'transaction_status_id' })
  transaction_status: TransactionStatus;
  @RelationId(
    (programCourses: ProgramCourses) => programCourses.transaction_status,
  )
  transaction_status_id: number;

  @Column({ type: 'varchar' }) paid_reference: string;
  @Column({ type: 'date' }) begin_date: string;
  @Column({ type: 'date' }) end_date: string;
  @Column({ type: 'varchar' }) ref_transaction: string;
  @Column({ type: 'decimal' }) paid_value: number;
  @Column({ type: 'varchar' }) certificate_file: string;
  @Column({ type: 'boolean' }) downloaded: boolean;
  @Column({ type: 'varchar' }) certificate_code_validation: string;
}
