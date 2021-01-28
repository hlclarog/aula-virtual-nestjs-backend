import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { MULTIPLE_OPTION_ANSWERS_ENTITY } from './multiple_option_answers.dto';
import { ActivityMultipleOptions } from '../activity_multiple_options/activity_multiple_options.entity';

@Entity(MULTIPLE_OPTION_ANSWERS_ENTITY)
export class MultipleOptionAnswers extends Base {
  @Column({ type: 'text' })
  description: string;

  @Column('boolean', { default: false })
  right: boolean;

  @ManyToOne(
    () => ActivityMultipleOptions,
    (activity_multiple_options) =>
      activity_multiple_options.multiple_option_answers,
  )
  @JoinColumn({ name: 'activity_multiple_option' })
  activity_multiple_option: ActivityMultipleOptions | number;
  @RelationId(
    (multiple_option_answers: MultipleOptionAnswers) =>
      multiple_option_answers.activity_multiple_option,
  )
  activity_multiple_option_id: number;
}
