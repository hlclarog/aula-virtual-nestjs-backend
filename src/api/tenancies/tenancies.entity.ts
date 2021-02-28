import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Base } from '../../base/base.entity';
import { Clients } from '../clients/clients.entity';
import { Servers } from '../instance/servers/servers.entity';
import { Plans } from '../plans/plans.entity';
import { TenancyConfig } from '../tenancy_config/tenancy_config.entity';
import { TenancyDomains } from '../tenancy_domains/tenancy_domains.entity';
import { TenancyEmails } from '../tenancy_emails/tenancy_emails.entity';
import { TenancyLanguages } from '../tenancy_languages/tenancy_languages.entity';
import { TenancyModules } from '../tenancy_modules/tenancy_modules.entity';
import { TenancyStatus } from '../tenancy_status/tenancy_status.entity';
import { TENANCIES_ENTITY } from './tenancies.dto';

@Entity({ name: TENANCIES_ENTITY, schema: 'public' })
export class Tenancies extends Base {
  @OneToMany(() => TenancyConfig, (config) => config.tenancy)
  config: TenancyConfig[];

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  alias: string;

  @Column({ type: 'varchar', unique: true })
  database_name: string;

  @Column({ type: 'varchar' })
  server_address: string;

  @Column({ type: 'varchar' })
  administrator: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', unique: true })
  schema: string;

  @Column({ type: 'timestamp', default: new Date(), nullable: true })
  activation_time: any;

  @OneToMany(() => TenancyDomains, (tenancy_domain) => tenancy_domain.tenancy)
  domains: TenancyDomains[];

  @OneToMany(() => TenancyEmails, (tenancy_email) => tenancy_email.tenancy)
  emails: TenancyEmails[];

  @OneToMany(
    () => TenancyLanguages,
    (tenancy_language) => tenancy_language.tenancy,
  )
  tenancy_languages: TenancyLanguages[];

  @OneToMany(() => TenancyModules, (tenancy_module) => tenancy_module.tenancy)
  tenancy_modules: TenancyModules[];

  @ManyToOne(() => Clients, (client) => client.tenancies)
  @JoinColumn({ name: 'client_id' })
  client: Clients;

  @RelationId((tenancies: Tenancies) => tenancies.client)
  @Column({ type: 'integer' })
  client_id: number;

  @ManyToOne(() => TenancyStatus, (tenancy_status) => tenancy_status.tenancies)
  @JoinColumn({ name: 'tenancy_status_id' })
  tenancy_status: TenancyStatus;

  @RelationId((tenancies: Tenancies) => tenancies.tenancy_status)
  @Column({ type: 'integer' })
  tenancy_status_id: number;

  @ManyToOne(() => Servers, (server) => server.tenancies_front)
  @JoinColumn({ name: 'front_server_id' })
  front_server: Servers;

  @RelationId((tenancie: Tenancies) => tenancie.front_server)
  @Column({ type: 'integer' })
  front_server_id: number;

  @ManyToOne(() => Servers, (server) => server.tenancies_back)
  @JoinColumn({ name: 'back_server_id' })
  back_server: Servers;

  @RelationId((tenancie: Tenancies) => tenancie.back_server)
  @Column({ type: 'integer' })
  back_server_id: number;

  @ManyToOne(() => Plans, (plan) => plan.tenancies)
  @JoinColumn({ name: 'plan_id' })
  plan: Plans;

  @RelationId((tenancie: Tenancies) => tenancie.plan)
  @Column({ type: 'integer' })
  plan_id: number;
}
