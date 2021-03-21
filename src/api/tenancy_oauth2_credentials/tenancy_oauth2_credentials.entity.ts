import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Tenancies } from '../tenancies/tenancies.entity';
import { TENANCY_DOMAINS_ENTITY } from './tenancy_oauth2_credentials.dto';

@Entity({ name: TENANCY_DOMAINS_ENTITY })
export class TenancyOauth2Credentials extends Base {
  @Column({ type: 'varchar' }) description: string;
  @Column({ type: 'varchar' }) type: string;
  @Column({ type: 'varchar' }) client_id: string;
  @Column({ type: 'varchar' }) client_secret: string;
  @Column({ type: 'varchar' }) scope: string;
  @Column({ type: 'varchar' }) private_key: string;
  @Column({ type: 'varchar' }) public_key: string;
  @Column({ type: 'varchar' }) callback_url: string;

  @ManyToOne(
    () => Tenancies,
    (tenancies) => tenancies.tenancy_oauth2_credentials,
  )
  @JoinColumn({ name: 'tenancy_id' })
  tenancy: Tenancies;

  @RelationId(
    (tenancy_oauth2_credentials: TenancyOauth2Credentials) =>
      tenancy_oauth2_credentials.tenancy,
  )
  @Column({ type: 'integer' })
  tenancy_id: number;
}
