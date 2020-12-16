import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Tenancies } from '../tenancies/tenancies.entity';
import { TENANCY_DOMAINS_ENTITY } from './tenancy_domains.dto';

@Entity(TENANCY_DOMAINS_ENTITY)
export class TenancyDomains extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @ManyToOne(() => Tenancies, (tenancies) => tenancies.domains, { eager: true })
  tenancy: Tenancies;

  @RelationId((tenancy_domains: TenancyDomains) => tenancy_domains.tenancy)
  tenancy_id: number;
}
