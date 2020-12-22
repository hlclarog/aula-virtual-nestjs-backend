import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../../base/base.entity';
import { Servers } from '../servers/servers.entity';
import { CONNECTION_TYPES_ENTITY } from './connection_types.dto';

@Entity(CONNECTION_TYPES_ENTITY)
export class ConnectionTypes extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @OneToMany(() => Servers, (server) => server.connection_type)
  servers: Servers[];
}
