import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Tenancies } from '../tenancies/tenancies.entity';
import { TENANCY_EMAILS_ENTITY } from './tenancy_emails.dto';

@Entity({ name: TENANCY_EMAILS_ENTITY, schema: 'public' })
export class TenancyEmails extends Base {
  @Column({ type: 'varchar' })
  email_address: string;

  @Column({ type: 'varchar' })
  email_name: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  hostname: string;

  @Column({ type: 'int' })
  port_number: number;

  @Column({ type: 'varchar' })
  authentication_required: string;

  @ManyToOne(() => Tenancies, (tenancies) => tenancies.emails)
  @JoinColumn({ name: 'tenancy_id' })
  tenancy: Tenancies;

  @RelationId((tenancy_emails: TenancyEmails) => tenancy_emails.tenancy)
  @Column({ type: 'integer' })
  tenancy_id: number;
}
