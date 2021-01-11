import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Competence } from '../competences/competence.entity';
import { COMPETENCE_TYPES_ENTITY } from './competence-types.dto';

@Entity({ name: COMPETENCE_TYPES_ENTITY })
export class CompetenceType extends Base {
  @Column({ type: 'varchar' }) description: string;
  @OneToMany(() => Competence, (competence) => competence.competence_type)
  competence: Competence[];
}
