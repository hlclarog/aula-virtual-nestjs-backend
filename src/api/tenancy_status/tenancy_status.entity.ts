import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Tenancies } from '../tenancies/tenancies.entity';
import { TENANCY_STATUS_ENTITY } from './tenancy_status.dto';

@Entity(TENANCY_STATUS_ENTITY)
export class TenancyStatus extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @OneToMany(() => Tenancies, (tenancies) => tenancies.tenancy_status)
  tenancies: Tenancies[];
}
