import { Column, Entity, OneToMany } from 'typeorm';
import { PAYMENT_STATUS_ENTITY } from './payment_status.dto';
import { Base } from '../../base/base.entity';
import { Programs } from '../programs/programs.entity';
import { Payments } from '../payments/payments.entity';

@Entity({ name: PAYMENT_STATUS_ENTITY })
export class PaymentStatus extends Base {
  @Column({ type: 'varchar' }) description: string;

  @OneToMany(() => Payments, (payments) => payments.payment_state)
  payments: Payments[];
}
