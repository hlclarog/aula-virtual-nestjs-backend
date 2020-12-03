import { Column, Entity } from 'typeorm';
import { Base } from '../../base/base.entity';
import { IDENTIFICATION_TYPES_ENTITY } from './identification_types.dto';

@Entity(IDENTIFICATION_TYPES_ENTITY)
export class IdentificationTypes extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;
}
