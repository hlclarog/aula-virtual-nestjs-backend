import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { IdentificationTypes } from '../identification_types/identification_types.entity';
import { Tenancies } from '../tenancies/tenancies.entity';
import { CLIENTS_ENTITY } from './clients.dto';

@Entity(CLIENTS_ENTITY)
export class Clients extends Base {
  @Column({ length: 500, type: 'varchar' })
  name: string;

  @Column({ length: 20, type: 'varchar' })
  dni: string;

  @Column({ type: 'varchar' })
  agent_name: string;
  @Column({ type: 'varchar' })
  agent_phone: string;
  @Column({ type: 'varchar' })
  agent_email: string;
  @Column({ type: 'varchar' })
  agent_cellphone: string;

  @Column({ type: 'varchar' })
  billing_name: string;
  @Column({ type: 'varchar' })
  billing_phone: string;
  @Column({ type: 'varchar' })
  billing_email: string;
  @Column({ type: 'varchar' })
  billing_cellphone: string;

  @ManyToOne(
    () => IdentificationTypes,
    (identification_type) => identification_type.clients,
    { eager: true },
  )
  identification_type: IdentificationTypes;

  @RelationId((client: Clients) => client.identification_type)
  identification_type_id: number;

  @OneToMany(() => Tenancies, (tenancies) => tenancies.tenancy_status)
  tenancies: Tenancies[];
}
