import { Base } from '../../base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { CompetenceType } from '../competence-types/competence-type.entity';
import { COMPETENCES_ENTITY } from './competences.dto';
@Entity({ name: COMPETENCES_ENTITY })
export class Competence extends Base {
  @Column({ type: 'varchar' })
  description: string;
  @ManyToOne(
    () => CompetenceType,
    (competence_type) => competence_type.competence,
    { eager: true },
  )
  @JoinColumn({ name: 'competence_type_id' })
  competence_type: CompetenceType;

  @RelationId((competence: Competence) => competence.competence_type)
  competence_type_id: number;
}
