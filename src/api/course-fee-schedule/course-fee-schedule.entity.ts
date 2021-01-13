import { Column, Entity } from 'typeorm';
import { COURSE_FEE_SCHEDULE_ENTITY } from './course-fee-schedule.dto';
import { Base } from '../../base/base.entity';

@Entity({ name: COURSE_FEE_SCHEDULE_ENTITY })
export class CourseFeeSchedules extends Base {
  @Column({ type: 'int' }) currency_id: number;
  @Column({ type: 'int' }) course_id: number;
  @Column({ type: 'date' }) begin: number;
  @Column({ type: 'date' }) end: number;
  @Column({ type: 'date' }) course_val: number;
  @Column({ type: 'date' }) certificate_val: number;

}
