import { Inject, Injectable } from '@nestjs/common';
import {
  CreateCoursePaymentsDto,
  COURSE_PAYMENTS_PROVIDER,
  UpdateCoursePaymentsDto,
} from './course_payments.dto';
import { BaseService } from '../../base/base.service';
import { CoursePayments } from './course_payments.entity';
import { BaseRepo } from '../../base/base.repository';
@Injectable()
export class CoursePaymentService extends BaseService<
  CoursePayments,
  CreateCoursePaymentsDto,
  UpdateCoursePaymentsDto
> {
  @Inject(COURSE_PAYMENTS_PROVIDER) repository: BaseRepo<CoursePayments>;
}
