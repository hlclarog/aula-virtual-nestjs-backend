import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Programs } from '../programs/programs.entity';
import { TransactionStatus } from '../transaction_status/transaction_status.entity';
import { PROGRAM_COURSES_ENTITY } from './program_courses.dto';
import { Courses } from '../courses/courses.entity';

@Entity({ name: PROGRAM_COURSES_ENTITY })
export class ProgramCourses extends Base {
  @ManyToOne(() => Courses, (courses) => courses.program_courses)
  @JoinColumn({ name: 'course_id' })
  course: Courses;
  @RelationId((programCourses: ProgramCourses) => programCourses.course)
  @Column({ type: 'integer' })
  course_id: number;

  @ManyToOne(() => Programs, (programs) => programs.program_courses)
  @JoinColumn({ name: 'program_id' })
  program: Programs;
  @RelationId((programCourses: ProgramCourses) => programCourses.program)
  @Column({ type: 'integer' })
  program_id: number;

  @ManyToOne(
    () => TransactionStatus,
    (transaction_status) => transaction_status.program_courses,
  )
  @JoinColumn({ name: 'transaction_status_id' })
  transaction_status: TransactionStatus;
  @RelationId(
    (programCourses: ProgramCourses) => programCourses.transaction_status,
  )
  @Column({ type: 'integer' })
  transaction_status_id: number;
}
