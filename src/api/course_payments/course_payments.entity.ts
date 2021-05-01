import { Column, Entity, JoinColumn, ManyToOne, OneToOne, RelationId } from 'typeorm';
import { COURSE_PAYMENTS_ENTITY } from './course_payments.dto';
import { Base } from '../../base/base.entity';
import { Courses } from '../courses/courses.entity';
import { Payments } from '../payments/payments.entity';
import { Users } from '../acl/users/users.entity';

@Entity(COURSE_PAYMENTS_ENTITY)
export class CoursePayments extends Base {
  @ManyToOne(() => Courses, (courses) => courses.course_payment)
  @JoinColumn({ name: 'course_id' })
  courses: Courses;
  @RelationId((course_payments: CoursePayments) => course_payments.courses)
  @Column({ type: 'int' })
  course_id: number;

  @OneToOne(() => Payments, (payments) => payments.course_payment)
  @JoinColumn({ name: 'payment_id' })
  payments: Payments;
  @RelationId((course_payment: CoursePayments) => course_payment.payments)
  @Column({ type: 'int' })
  payment_id: number;

  @ManyToOne(() => Users, (users: Users) => users.course_payments)
  @JoinColumn({ name: 'user_id' })
  users: Users;
  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'varchar', nullable: true }) description: string;
}
