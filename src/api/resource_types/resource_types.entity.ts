import { Column, Entity } from 'typeorm';
import { Base } from '../../base/base.entity';
import { RESOURCE_TYPES_ENTITY } from './resource_types.dto';

@Entity({ name: RESOURCE_TYPES_ENTITY, schema: 'public' })
export class ResourceTypes extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;
}
