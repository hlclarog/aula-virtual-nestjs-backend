import { Column, Entity, OneToMany } from 'typeorm';
import { COLLECTION_TYPES_ENTITY } from './collection_types.dto';
import { Base } from '../../base/base.entity';
import { Payments } from '../payments/payments.entity';

@Entity({ name: COLLECTION_TYPES_ENTITY })
export class CollectionTypes extends Base {
  @Column({ type: 'varchar' }) description: string;

  @OneToMany(() => Payments, (payments) => payments.payment_state)
  payments: Payments[];
}
