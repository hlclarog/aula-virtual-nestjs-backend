import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Roles } from '../acl/roles/roles.entity';
import { Tenancies } from '../tenancies/tenancies.entity';
import { TenancyEmails } from '../tenancy_emails/tenancy_emails.entity';
import { Themes } from '../themes/themes.entity';
import { TENANCY_CONFIG_ENTITY } from './tenancy_config.dto';

@Entity({ name: TENANCY_CONFIG_ENTITY })
export class TenancyConfig extends Base {
  @ManyToOne(() => Tenancies, (tenancy) => tenancy.config)
  @JoinColumn({ name: 'tenancy_id' })
  tenancy: Tenancies;
  @RelationId((tenancy_config: TenancyConfig) => tenancy_config.tenancy)
  @Column({ type: 'integer' })
  tenancy_id: number;

  @ManyToOne(() => Themes, (theme) => theme.tenancies_config)
  @JoinColumn({ name: 'theme_id' })
  theme: Themes;
  @RelationId((tenancy_config: TenancyConfig) => tenancy_config.theme)
  @Column({ type: 'integer' })
  theme_id: number;

  @ManyToOne(() => Roles, (rol) => rol.tenancy_config)
  @JoinColumn({ name: 'rol_default_id' })
  rol_default: Roles;
  @RelationId((tenancy_config: TenancyConfig) => tenancy_config.rol_default)
  @Column({ type: 'integer' })
  rol_default_id: number;

  @ManyToOne(() => TenancyEmails, (email) => email.tenancy_config)
  @JoinColumn({ name: 'tenancy_email_default_id' })
  tenancy_email_default: TenancyEmails;
  @RelationId(
    (tenancy_config: TenancyConfig) => tenancy_config.tenancy_email_default,
  )
  @Column({ type: 'integer' })
  tenancy_email_default_id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  web_client_oauth: string;

  @Column({ type: 'varchar' })
  short_name: string;

  @Column({ type: 'varchar' })
  message_welcome: string;

  @Column({ type: 'varchar' })
  image_small: string;

  @Column({ type: 'varchar' })
  image_big: string;

  @Column('boolean', { default: true })
  allow_registration: boolean;

  @Column({ type: 'integer' })
  initial_lives: number;

  @Column({ type: 'integer' })
  initial_points: number;

  @Column({ type: 'integer' })
  limit_lives: number;

  @Column({ type: 'varchar' })
  image_lives: string;

  @Column({ type: 'varchar' })
  image_points: string;

  @Column({ type: 'integer' })
  bar_span_days: number;

  @Column({ type: 'integer' })
  bar_expected_points: number;

  @Column('boolean', { default: false })
  unenroll_reset: boolean;
}
