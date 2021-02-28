import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Tenancies } from '../tenancies/tenancies.entity';
import { TENANCY_DOMAINS_ENTITY } from './tenancy_domains.dto';

@Entity({ name: TENANCY_DOMAINS_ENTITY, schema: 'public' })
export class TenancyDomains extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @ManyToOne(() => Tenancies, (tenancies) => tenancies.domains)
  @JoinColumn({ name: 'tenancy_id' })
  tenancy: Tenancies;

  @RelationId((tenancy_domains: TenancyDomains) => tenancy_domains.tenancy)
  @Column({ type: 'integer' })
  tenancy_id: number;
}
