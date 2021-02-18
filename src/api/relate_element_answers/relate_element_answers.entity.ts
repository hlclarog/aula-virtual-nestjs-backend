import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { RELATE_ELEMENT_ANSWERS_ENTITY } from './relate_element_answers.dto';
import { ActivityRelateElements } from '../activity_relate_elements/activity_relate_elements.entity';

@Entity(RELATE_ELEMENT_ANSWERS_ENTITY)
export class RelateElementAnswers extends Base {
  @Column({ type: 'text', nullable: true })
  term: string;
  @Column({ type: 'text', nullable: true })
  definition: string;

  @ManyToOne(
    () => ActivityRelateElements,
    (activity_relate_elements) =>
      activity_relate_elements.relate_element_answers,
  )
  @JoinColumn({ name: 'activity_relate_element_id' })
  activity_relate_element: ActivityRelateElements;
  @RelationId(
    (relate_element_answers: RelateElementAnswers) =>
      relate_element_answers.activity_relate_element,
  )
  @Column({ type: 'integer' })
  activity_relate_element_id: number;
}
