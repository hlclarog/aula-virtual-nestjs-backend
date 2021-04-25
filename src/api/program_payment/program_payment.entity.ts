import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { PROGRAM_PAYMENT_ENTITY } from './program_payment.dto';
import { Base } from '../../base/base.entity';
import { Programs } from '../programs/programs.entity';
import { Users } from '../acl/users/users.entity';
import { Payments } from '../payments/payments.entity';

@Entity({ name: PROGRAM_PAYMENT_ENTITY })
export class ProgramPayment extends Base {
  @ManyToOne(() => Programs, (programs) => programs.program_payment)
  @JoinColumn({ name: 'program_id' })
  programs: Programs;
  @RelationId((program_payment: ProgramPayment) => program_payment.programs)
  @Column({ type: 'int' })
  program_id: number;

  @ManyToOne(() => Users, (users) => users.program_payment)
  @JoinColumn({ name: 'user_id' })
  users: Users;
  @RelationId((program_payment: ProgramPayment) => program_payment.users)
  @Column({ type: 'int' })
  user_id: number;

  @ManyToOne(() => Payments, (payments) => payments.program_payment)
  @JoinColumn({ name: 'payment_id' })
  payments: Payments;
  @RelationId((program_payment: ProgramPayment) => program_payment.payments)
  @Column({ type: 'int' })
  payment_id: number;

  @Column({ type: 'int', nullable: true }) credits?: number;
  @Column({ type: 'varchar', nullable: true }) description: string;
}
