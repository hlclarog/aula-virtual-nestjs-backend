import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { COURSE_FEE_SCHEDULE_ENTITY } from './course-fee-schedule.dto';
import { Base } from '../../base/base.entity';
import { Currencies } from '../currencies/currency.entity';
import { Course } from '../courses/course.entity';

@Entity({ name: COURSE_FEE_SCHEDULE_ENTITY })
export class CourseFeeSchedules extends Base {
  @ManyToOne(
    () => Currencies,
    (currencies) => currencies.course_fee_schedules,
    { eager: true },
  )
  @JoinColumn({ name: 'currency_id' })
  currency: Currencies | number;

  @RelationId(
    (courseFeeSchedules: CourseFeeSchedules) => courseFeeSchedules.currency,
  )
  currency_id: number;

  @ManyToOne(() => Course, (course) => course.course_fee_schedules, {
    eager: true,
  })
  @JoinColumn({ name: 'course_id' })
  course: Course | number;

  @RelationId(
    (courseFeeSchedules: CourseFeeSchedules) => courseFeeSchedules.course,
  )
  course_id: number;

  @Column({ type: 'date' }) begin: string;
  @Column({ type: 'date', nullable: true }) end: string;

  @Column({ type: 'decimal', nullable: true, default: 0.0 }) course_val: number;
  @Column({ type: 'decimal', nullable: true, default: 0.0 })
  certificate_val: number;
}
