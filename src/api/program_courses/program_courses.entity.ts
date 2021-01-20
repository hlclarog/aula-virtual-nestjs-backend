import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Course } from '../courses/course.entity';
import { Programs } from '../programs/programs.entity';
import { TransactionStatus } from '../transaction_status/transaction_status.entity';
import { PROGRAM_COURSES_ENTITY } from './program_courses.dto';

@Entity({ name: PROGRAM_COURSES_ENTITY })
export class ProgramCourses extends Base {
  @ManyToOne(() => Course, (courses) => courses.program_courses, {
    eager: true,
  })
  @JoinColumn({ name: 'course_id' })
  course: Course;
  @RelationId((programCourses: ProgramCourses) => programCourses.course)
  course_id: number;

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
}