import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Positions } from '../positions/positions.entity';
import { Competence } from '../competences/competence.entity';
import { POSITIONS_COMPETENCES_ENTITY } from './position_competences.dto';

@Entity({ name: POSITIONS_COMPETENCES_ENTITY })
export class PositionCompetences extends Base {
  @ManyToOne(() => Positions, (position) => position.position_competences)
  @JoinColumn({ name: 'position_id' })
  position: Positions;
  @RelationId(
    (positionCompetences: PositionCompetences) => positionCompetences.position,
  )
  @Column('integer')
  position_id: number;

  @ManyToOne(() => Competence, (competence) => competence.position_competences)
  @JoinColumn({ name: 'competence_id' })
  competence: Competence;
  @RelationId(
    (positionCompetences: PositionCompetences) =>
      positionCompetences.competence,
  )
  @Column('integer')
  competence_id: number;
}
