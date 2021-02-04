import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { RESOURCE_TYPES_ENTITY } from './resource_types.dto';
import { ActivityMultipleOptions } from '../activity_multiple_options/activity_multiple_options.entity';
import { ActivitySortItems } from '../activity_sort_items/activity_sort_items.entity';
import { ActivityRelateElements } from '../activity_relate_elements/activity_relate_elements.entity';
import { ActivityIdentifyWords } from '../activity_identify_words/activity_identify_words.entity';
import { ActivityCompleteTexts } from '../activity_complete_texts/activity_complete_texts.entity';

@Entity({ name: RESOURCE_TYPES_ENTITY, schema: 'public' })
export class ResourceTypes extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @OneToMany(
    () => ActivityMultipleOptions,
    (activity_multiple_options) => activity_multiple_options.resource_type,
  )
  activity_multiple_options: ActivityMultipleOptions[];

  @OneToMany(
    () => ActivitySortItems,
    (activity_sort_items) => activity_sort_items.resource_type,
  )
  activity_sort_items: ActivitySortItems[];

  @OneToMany(
    () => ActivityRelateElements,
    (activity_relate_elements) => activity_relate_elements.resource_type,
  )
  activity_relate_elements: ActivityRelateElements[];

  @OneToMany(
    () => ActivityIdentifyWords,
    (activity_identify_words) => activity_identify_words.resource_type,
  )
  activity_identify_words: ActivityIdentifyWords[];

  @OneToMany(
    () => ActivityCompleteTexts,
    (activity_complete_texts) => activity_complete_texts.resource_type,
  )
  activity_complete_texts: ActivityCompleteTexts[];
}
