import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { IdentificationTypes } from '../identification_types/identification_types.entity';
import { Tenancies } from '../tenancies/tenancies.entity';
import { CLIENTS_ENTITY } from './clients.dto';

@Entity(CLIENTS_ENTITY)
export class Clients extends Base {
  @Column({ length: 500, type: 'varchar' })
  name: string;

  @Column({ length: 500, type: 'varchar' })
  last_name: string;

  @ManyToOne(
    () => IdentificationTypes,
    (identification_type) => identification_type.clients,
    { eager: true },
  )
  identification_type: IdentificationTypes[];

  @OneToMany(() => Tenancies, (tenancies) => tenancies.tenancy_status)
  tenancies: Tenancies[];
}
