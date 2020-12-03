import { Column, Entity } from 'typeorm';
import { Base } from '../../base/base.entity';
import { EMAIL_TYPES_ENTITY } from './email_types.dto';

@Entity(EMAIL_TYPES_ENTITY)
export class EmailTypes extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @Column({ length: 5, type: 'varchar' })
  observations: string;
}
