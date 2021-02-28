import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { SORT_ITEM_ANSWERS_ENTITY } from './sort_item_answers.dto';
import { ActivitySortItems } from '../activity_sort_items/activity_sort_items.entity';

@Entity(SORT_ITEM_ANSWERS_ENTITY)
export class SortItemAnswers extends Base {
  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  order: number;

  @ManyToOne(
    () => ActivitySortItems,
    (activity_sort_items) => activity_sort_items.sort_item_answers,
  )
  @JoinColumn({ name: 'activity_sort_item_id' })
  activity_sort_item: ActivitySortItems;
  @RelationId(
    (sort_item_answers: SortItemAnswers) =>
      sort_item_answers.activity_sort_item,
  )
  @Column({ type: 'integer' })
  activity_sort_item_id: number;
}
