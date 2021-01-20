import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { PROGRAM_FEE_SCHEDULE_ENTITY } from './program_fee_schedules.dto';
import { Base } from '../../base/base.entity';
import { Currencies } from '../currencies/currency.entity';
import { Programs } from '../programs/programs.entity';

@Entity({ name: PROGRAM_FEE_SCHEDULE_ENTITY })
export class ProgramFeeSchedules extends Base {
  @ManyToOne(
    () => Currencies,
    (currencies) => currencies.program_fee_schedules,
    { eager: true },
  )
  @JoinColumn({ name: 'currency_id' })
  currency: Currencies | number;
  @RelationId(
    (programFeeSchedules: ProgramFeeSchedules) => programFeeSchedules.currency,
  )
  currency_id: number;

  @ManyToOne(() => Programs, (program) => program.program_fee_schedules, {
    eager: true,
  })
  @JoinColumn({ name: 'program_id' })
  program: Programs | number;
  @RelationId(
    (programFeeSchedules: ProgramFeeSchedules) => programFeeSchedules.program,
  )
  program_id: number;

  @Column({ type: 'date' }) begin: string;
  @Column({ type: 'date', nullable: true }) end: string;
  @Column({ type: 'decimal', nullable: true, default: 0.0 })
  program_val: number;
  @Column({ type: 'decimal', nullable: true, default: 0.0 })
  certificate_val: number;
}
