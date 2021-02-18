import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { PROGRAM_INTEREST_AREAS_ENTITY } from './program_interest_areas.dto';
import { Base } from '../../base/base.entity';
import { Programs } from '../programs/programs.entity';
import { InterestAreas } from '../interest_areas/interest_areas.entity';

@Entity(PROGRAM_INTEREST_AREAS_ENTITY)
export class ProgramInterestAreas extends Base {
  @ManyToOne(() => Programs, (program) => program.program_interest_areas, {
    eager: true,
  })
  @JoinColumn({ name: 'program_id' })
  program: Programs;
  @RelationId(
    (programInterestAreas: ProgramInterestAreas) =>
      programInterestAreas.program,
  )
  @Column({ type: 'integer' })
  program_id: number;

  @ManyToOne(
    () => InterestAreas,
    (interest_areas) => interest_areas.program_interest_areas,
    { eager: true },
  )
  @JoinColumn({ name: 'interest_area_id' })
  interest_area: InterestAreas;
  @RelationId(
    (programInterestAreas: ProgramInterestAreas) =>
      programInterestAreas.interest_area,
  )
  @Column({ type: 'integer' })
  interest_area_id: number;
}
