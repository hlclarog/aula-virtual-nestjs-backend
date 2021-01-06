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
import { TenancyDomains } from '../tenancy_domains/tenancy_domains.entity';
import { TenancyEmails } from '../tenancy_emails/tenancy_emails.entity';
import { TenancyLanguages } from '../tenancy_languages/tenancy_languages.entity';
import { TenancyStatus } from '../tenancy_status/tenancy_status.entity';
import { TENANCIES_ENTITY } from './tenancies.dto';

@Entity({ name: TENANCIES_ENTITY, schema: 'public' })
export class Tenancies extends Base {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  alias: string;

  @Column({ type: 'varchar' })
  database_name: string;

  @Column({ type: 'varchar' })
  server_address: string;

  @Column({ type: 'varchar' })
  administrator: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
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

  @ManyToOne(() => Clients, (client) => client.tenancies, { eager: true })
  @JoinColumn({ name: 'client_id' })
  client: Clients | number;

  @RelationId((tenancies: Tenancies) => tenancies.client)
  client_id: number;

  @ManyToOne(
    () => TenancyStatus,
    (tenancy_status) => tenancy_status.tenancies,
    { eager: true },
  )
  @JoinColumn({ name: 'tenancy_status_id' })
  tenancy_status: TenancyStatus | number;

  @RelationId((tenancies: Tenancies) => tenancies.tenancy_status)
  tenancy_status_id: number;

  @ManyToOne(() => Servers, (server) => server.tenancies_front, { eager: true })
  @JoinColumn({ name: 'front_server_id' })
  front_server: Servers | number;

  @RelationId((tenancie: Tenancies) => tenancie.front_server)
  front_server_id: number;

  @ManyToOne(() => Servers, (server) => server.tenancies_back, { eager: true })
  @JoinColumn({ name: 'back_server_id' })
  back_server: Servers | number;

  @RelationId((tenancie: Tenancies) => tenancie.back_server)
  back_server_id: number;
}
