import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Base } from '../../base/base.entity';
import { ACTIVITY_RELATE_ELEMENTS_ENTITY } from './activity_relate_elements.dto';
import { ResourceTypes } from '../resource_types/resource_types.entity';
import { RelateElementAnswers } from '../relate_element_answers/relate_element_answers.entity';

@Entity(ACTIVITY_RELATE_ELEMENTS_ENTITY)
export class ActivityRelateElements extends Base {
  @Column({ type: 'text', nullable: true })
  statement: string;

  @Column({ type: 'text', nullable: true })
  observation: string;

  @Column({ type: 'varchar', nullable: true })
  picture: string;

  @Column({ type: 'varchar', nullable: true })
  video: string;

  @Column({ type: 'varchar', nullable: true })
  audio: string;
  @Column({ type: 'text', nullable: true })
  resource_content: string;

  @ManyToOne(
    () => ResourceTypes,
    (resource_types) => resource_types.activity_relate_elements,
  )
  @JoinColumn({ name: 'resource_type_id' })
  resource_type: ResourceTypes | number;
  @RelationId(
    (activity_relate_elements: ActivityRelateElements) =>
      activity_relate_elements.resource_type,
  )
  resource_type_id: number;

  @OneToMany(
    () => RelateElementAnswers,
    (relate_element_answers) => relate_element_answers.activity_relate_element,
  )
  relate_element_answers: RelateElementAnswers[];
}
