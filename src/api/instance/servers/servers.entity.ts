import { Tenancies } from 'src/api/tenancies/tenancies.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { Base } from '../../../base/base.entity';
import { ConnectionTypes } from '../connection_types/connection_types.entity';
import { ServerTypes } from '../server_types/server_types.entity';
import { SERVERS_ENTITY } from './servers.dto';

@Entity(SERVERS_ENTITY)
export class Servers extends Base {
  @Column({ type: 'varchar' })
  ip_public: string;

  @Column({ type: 'varchar' })
  name_server: string;

  @Column({ type: 'varchar' })
  user: string;

  @Column({ type: 'varchar' })
  pass: string;

  @Column({ type: 'varchar' })
  ssh_key: string;

  @Column({ type: 'varchar' })
  ip_address: string;

  @ManyToOne(() => ServerTypes, (server) => server.servers, { eager: true })
  server_type: ServerTypes;

  @RelationId((server: Servers) => server.server_type)
  server_type_id: number;

  @ManyToOne(() => ConnectionTypes, (server) => server.servers, { eager: true })
  connection_type: ConnectionTypes;

  @RelationId((server: Servers) => server.connection_type)
  connection_type_id: number;

  @OneToMany(() => Tenancies, (tenancies) => tenancies.back_server)
  tenancies_front: Tenancies[];

  @OneToMany(() => Tenancies, (tenancies) => tenancies.back_server)
  tenancies_back: Tenancies[];
}