import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Base } from '../../base/base.entity';
import { EmailActivitiesTemplate } from '../email_activities_template/email_activities_template.entity';
import { Tenancies } from '../tenancies/tenancies.entity';
import { TenancyConfig } from '../tenancy_config/tenancy_config.entity';
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

  @OneToMany(
    () => TenancyConfig,
    (tenancy_config) => tenancy_config.tenancy_email_default,
  )
  tenancy_config: TenancyConfig[];

  @OneToMany(
    () => EmailActivitiesTemplate,
    (template) => template.tenancy_email,
  )
  email_activities_template: EmailActivitiesTemplate[];
}
