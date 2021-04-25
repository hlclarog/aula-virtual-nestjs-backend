import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { BaseController } from '../../base/base.controller';
import { CoursePayments } from './course_payments.entity';
import {
  CreateCoursePaymentsDto,
  UpdateCoursePaymentsDto,
} from './course_payments.dto';
import { CoursePaymentService } from './course_payment.service';

@ControllerApi({ name: 'course_programs' })
export class CoursePaymentsController extends BaseController<
  CoursePayments,
  CreateCoursePaymentsDto,
  UpdateCoursePaymentsDto
> {
  constructor(private readonly coursePaymentService: CoursePaymentService) {
    super(coursePaymentService);
  }

}
