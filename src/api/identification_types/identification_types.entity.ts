import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Clients } from '../clients/clients.entity';
import { IDENTIFICATION_TYPES_ENTITY } from './identification_types.dto';

@Entity({ name: IDENTIFICATION_TYPES_ENTITY, schema: 'public' })
export class IdentificationTypes extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;
  @OneToMany(
    () => Clients,
    (clients) => clients.identification_type)
  clients: Clients[];
}
