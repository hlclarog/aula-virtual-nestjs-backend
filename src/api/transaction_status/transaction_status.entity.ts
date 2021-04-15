import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { ProgramCourses } from '../program_courses/program_courses.entity';
import { ProgramUsers } from '../program_users/program_users.entity';
import { TRANSACTION_STATUS_ENTITY } from './transaction_status.dto';

@Entity({ name: TRANSACTION_STATUS_ENTITY })
export class TransactionStatus extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @OneToMany(
    () => ProgramCourses,
    (programCourses) => programCourses.transaction_status,
  )
  program_courses: ProgramCourses[];
}
