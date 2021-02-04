import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Base } from '../../base/base.entity';
import { ACTIVITY_SORT_ITEMS_ENTITY } from './activity_sort_items.dto';
import { ResourceTypes } from '../resource_types/resource_types.entity';
import { SortItemAnswers } from '../sort_item_answers/sort_item_answers.entity';

@Entity(ACTIVITY_SORT_ITEMS_ENTITY)
export class ActivitySortItems extends Base {
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
    (resource_types) => resource_types.activity_sort_items,
  )
  @JoinColumn({ name: 'resource_type_id' })
  resource_type: ResourceTypes | number;
  @RelationId(
    (activity_sort_items: ActivitySortItems) =>
      activity_sort_items.resource_type,
  )
  resource_type_id: number;

  @OneToMany(
    () => SortItemAnswers,
    (sort_item_answers) => sort_item_answers.activity_sort_item,
  )
  sort_item_answers: SortItemAnswers[];
}
