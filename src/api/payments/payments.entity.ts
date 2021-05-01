import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, RelationId } from 'typeorm';
import { PAYMENTS_ENTITY } from './payments.dto';
import { Base } from '../../base/base.entity';
import { PaymentStatus } from '../payment_status/payment_status.entity';
import { CollectionTypes } from '../collection_types/collection_types.entity';
import { Currencies } from '../currencies/currency.entity';
import { ProgramPayment } from '../program_payment/program_payment.entity';
import { Organizations } from '../organizations/organizations.entity';
import { CoursePayments } from '../course_payments/course_payments.entity';

@Entity({ name: PAYMENTS_ENTITY })
export class Payments extends Base {
  @ManyToOne(() => PaymentStatus, (payment_status) => payment_status.payments)
  @JoinColumn({ name: 'payment_state_id' })
  payment_state: PaymentStatus;
  @RelationId((payments: Payments) => payments.payment_state)
  @RelationId((payments: Payments) => payments.course_payment)
  @Column({ type: 'int' })
  payment_state_id: number;

  @ManyToOne(
    () => CollectionTypes,
    (collection_types) => collection_types.payments,
  )
  @JoinColumn({ name: 'collection_type_id' })
  collection_type: CollectionTypes;
  @RelationId((payments: Payments) => payments.collection_type)
  @Column({ type: 'int' })
  collection_type_id: number;

  @ManyToOne(() => Currencies, (currencies) => currencies.payments)
  @JoinColumn({ name: 'currency_type_id' })
  currency_type: Currencies;
  @RelationId((payments: Payments) => payments.currency_type)
  @Column({ type: 'int' })
  currency_type_id: number;

  @ManyToOne(() => Organizations, (organizations) => organizations.payments)
  @JoinColumn({ name: 'organization_id' })
  organization: Organizations;
  @RelationId((payments: Payments) => payments.organization)
  @Column({ type: 'int' })
  organization_id: number;

  @Column({ type: 'text', nullable: true }) collection_file: string;
  @Column({ type: 'varchar', nullable: true }) transaction_code: string;
  @Column({ type: 'varchar', nullable: true }) transaction_reference: string;
  @Column({ type: 'decimal', default: 0.0 }) quantity: number;
  @Column({ type: 'varchar', nullable: true }) description: string;
  @Column({ type: 'text', nullable: true }) bank: string;
  @Column({ type: 'text', nullable: true }) snapshot: string;
  @Column({ type: 'date', nullable: true }) transaction_date: string; // Genero el Recibo para pagar => transaction_date
  @Column({ type: 'date', nullable: true }) paid_date: string; // Pague Al día siguiente en Baloto => paid_date
  @Column({ type: 'date', nullable: true }) processed_date: string; // Payu es notificado por Baloto al tercer día => processed_date

  @OneToMany(
    () => ProgramPayment,
    (program_payment) => program_payment.programs,
    { eager: true },
  )
  program_payment: ProgramPayment[];


  @OneToOne(
    () => CoursePayments,
    (course_payments) => course_payments.payments,
    { eager: true },
  )
  course_payment: CoursePayments;
}
