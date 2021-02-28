import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { ACTIVITY_COMPLETE_TEXTS_ENTITY } from './activity_complete_texts.dto';
import { ResourceTypes } from '../resource_types/resource_types.entity';

@Entity(ACTIVITY_COMPLETE_TEXTS_ENTITY)
export class ActivityCompleteTexts extends Base {
  @Column({ type: 'text', nullable: true })
  statement: string;

  @Column({ type: 'text', nullable: true })
  observation: string;

  @Column({ type: 'text', nullable: true })
  text: string;

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
    (resource_types) => resource_types.activity_complete_texts,
  )
  @JoinColumn({ name: 'resource_type_id' })
  resource_type: ResourceTypes;
  @RelationId(
    (activity_complete_texts: ActivityCompleteTexts) =>
      activity_complete_texts.resource_type,
  )
  @Column({ type: 'integer' })
  resource_type_id: number;
}
