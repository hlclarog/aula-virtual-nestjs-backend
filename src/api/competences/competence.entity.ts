import { Base } from '../../base/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { CompetenceType } from '../competence-types/competence-type.entity';
import { COMPETENCES_ENTITY } from './competences.dto';
import { CourseCompetences } from '../course_competences/course_competences.entity';
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
  @Column({ type: 'integer' })
  competence_type_id: number;

  @OneToMany(
    () => CourseCompetences,
    (courseCompetences) => courseCompetences.competence,
  )
  course_competences: CourseCompetences[];
}
