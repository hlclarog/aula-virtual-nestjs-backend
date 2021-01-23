import { Column, Entity } from 'typeorm';
import { Base } from '../../base/base.entity';
import { ACTIVITY_TYPES_ENTITY } from './activity_types.dto';

@Entity({ name: ACTIVITY_TYPES_ENTITY, schema: 'public' })
export class ActivityTypes extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;
}
