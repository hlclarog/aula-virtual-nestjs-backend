import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { CourseInterestAreas } from '../course_interest_areas/course_interest_areas.entity';
import { ProgramInterestAreas } from '../program_interest_areas/program_interest_areas.entity';
import { INTEREST_AREAS_ENTITY } from './interest_areas.dto';

@Entity({ name: INTEREST_AREAS_ENTITY })
export class InterestAreas extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @OneToMany(
    () => ProgramInterestAreas,
    (programInterestAreas) => programInterestAreas.interest_area,
  )
  program_interest_areas: ProgramInterestAreas[];

  @OneToMany(
    () => CourseInterestAreas,
    (courseInterestAreas) => courseInterestAreas.interest_area,
  )
  course_interest_areas: CourseInterestAreas[];
}
