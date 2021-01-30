import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { RESOURCE_TYPES_ENTITY } from './resource_types.dto';
import { ActivityMultipleOptions } from '../activity_multiple_options/activity_multiple_options.entity';

@Entity({ name: RESOURCE_TYPES_ENTITY, schema: 'public' })
export class ResourceTypes extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @OneToMany(
    () => ActivityMultipleOptions,
    (activity_multiple_options) => activity_multiple_options.resource_type,
  )
  activity_multiple_options: ActivityMultipleOptions[];
}
