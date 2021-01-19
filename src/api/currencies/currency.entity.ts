import { Column, Entity, OneToMany } from 'typeorm';
import { CURRENCY_ENTITY } from './currency.dto';
import { Base } from '../../base/base.entity';
import { CourseFeeSchedules } from '../course-fee-schedule/course-fee-schedule.entity';
import { ProgramFeeSchedules } from '../program_fee_schedules/program_fee_schedules.entity';

@Entity({ name: CURRENCY_ENTITY })
export class Currencies extends Base {
  @Column({ type: 'varchar' })
  description: string;
  @Column({ type: 'varchar' })
  code: string;
  @Column({ type: 'varchar' })
  symbol: string;
  @Column({ type: 'int' })
  decimals: number;

  @OneToMany(
    () => CourseFeeSchedules,
    (courseFeeSchedules) => courseFeeSchedules.currency,
  )
  course_fee_schedules: CourseFeeSchedules[];

  @OneToMany(
    () => ProgramFeeSchedules,
    (programFeeSchedules) => programFeeSchedules.currency,
  )
  program_fee_schedules: ProgramFeeSchedules[];
}
