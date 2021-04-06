import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { PROGRAM_COURSES_STATUS_ENTITY } from './program_courses_status.dto';
import { ProgramCourses } from '../program_courses/program_courses.entity';

@Entity({ name: PROGRAM_COURSES_STATUS_ENTITY, schema: 'public' })
export class ProgramCoursesStatus extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @OneToMany(
    () => ProgramCourses,
    (programCourses) => programCourses.program_courses_status,
  )
  program_courses: ProgramCourses[];
}
