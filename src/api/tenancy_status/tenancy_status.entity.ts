import { Column, Entity } from 'typeorm';
import { Base } from '../../base/base.entity';
import { TENANCY_STATUS_ENTITY } from './tenancy_status.dto';

@Entity(TENANCY_STATUS_ENTITY)
export class TenancyStatus extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;
}
