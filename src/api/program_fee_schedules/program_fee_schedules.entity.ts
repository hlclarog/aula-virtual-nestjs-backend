import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { PROGRAM_FEE_SCHEDULE_ENTITY } from './program_fee_schedules.dto';
import { Base } from '../../base/base.entity';
import { Currencies } from '../currencies/currency.entity';
import { Programs } from '../programs/programs.entity';

@Entity({ name: PROGRAM_FEE_SCHEDULE_ENTITY })
export class ProgramFeeSchedules extends Base {
  @ManyToOne(() => Currencies, (currencies) => currencies.program_fee_schedules)
  @JoinColumn({ name: 'currency_id' })
  currency: Currencies;
  @RelationId(
    (programFeeSchedules: ProgramFeeSchedules) => programFeeSchedules.currency,
  )
  @Column({ type: 'integer' })
  currency_id: number;

  @ManyToOne(() => Programs, (program) => program.program_fee_schedules)
  @JoinColumn({ name: 'program_id' })
  program: Programs;
  @RelationId(
    (programFeeSchedules: ProgramFeeSchedules) => programFeeSchedules.program,
  )
  @Column({ type: 'integer' })
  program_id: number;

  @Column({ type: 'date' }) begin: string;
  @Column({ type: 'date', nullable: true }) end: string;
  @Column({ type: 'decimal', nullable: true, default: 0.0 })
  program_val: number;
  @Column({ type: 'decimal', nullable: true, default: 0.0 })
  certificate_val: number;
}
