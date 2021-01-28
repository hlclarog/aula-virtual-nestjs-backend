import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { ACTIVITY_MULTIPLE_OPTIONS_ENTITY } from './activity_multiple_options.dto';
import { ResourceTypes } from '../resource_types/resource_types.entity';

@Entity(ACTIVITY_MULTIPLE_OPTIONS_ENTITY)
export class ActivityMultipleOptions extends Base {
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

  @ManyToOne(
    () => ResourceTypes,
    (resource_types) => resource_types.activity_multiple_options,
  )
  @JoinColumn({ name: 'resource_type_id' })
  resource_type: ResourceTypes | number;
  @RelationId(
    (activity_multiple_options: ActivityMultipleOptions) =>
      activity_multiple_options.resource_type,
  )
  resource_type_id: number;
}
