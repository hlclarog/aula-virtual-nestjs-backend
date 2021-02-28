import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { ACTIVITY_IDENTIFY_WORDS_ENTITY } from './activity_identify_words.dto';
import { ResourceTypes } from '../resource_types/resource_types.entity';

@Entity(ACTIVITY_IDENTIFY_WORDS_ENTITY)
export class ActivityIdentifyWords extends Base {
  @Column({ type: 'text', nullable: true })
  statement: string;

  @Column({ type: 'text', nullable: true })
  observation: string;

  @Column({ type: 'text', nullable: true })
  word: string;

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
    (resource_types) => resource_types.activity_identify_words,
  )
  @JoinColumn({ name: 'resource_type_id' })
  resource_type: ResourceTypes;
  @RelationId(
    (activity_identify_words: ActivityIdentifyWords) =>
      activity_identify_words.resource_type,
  )
  @Column({ type: 'integer' })
  resource_type_id: number;
}
