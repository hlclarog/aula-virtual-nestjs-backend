import { Column, Entity } from 'typeorm';
import { COURSE_FEE_SCHEDULE_ENTITY } from './course-fee-schedule.dto';
import { Base } from '../../base/base.entity';

@Entity({ name: COURSE_FEE_SCHEDULE_ENTITY })
export class CourseFeeSchedules extends Base {
  @Column({ type: 'int' }) currency_id: number;
  @Column({ type: 'int' }) course_id: number;

  @Column({ type: 'date' }) begin: string;
  @Column({ type: 'date', nullable: true }) end: string;

  @Column({ type: 'decimal', nullable: true, default: 0.0 }) course_val: number;
  @Column({ type: 'decimal', nullable: true, default: 0.0 })
  certificate_val: number;
}
