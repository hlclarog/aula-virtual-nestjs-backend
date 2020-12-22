import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../../base/base.entity';
import { Servers } from '../servers/servers.entity';
import { SERVER_TYPES_ENTITY } from './server_types.dto';

@Entity(SERVER_TYPES_ENTITY)
export class ServerTypes extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @OneToMany(() => Servers, (server) => server.server_type)
  servers: Servers[];
}
