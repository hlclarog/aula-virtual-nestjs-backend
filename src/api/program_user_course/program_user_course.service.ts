import { Inject, Injectable } from '@nestjs/common';
import {
  AvailableCreditsDto,
  CreateProgramUserCourseDto,
  PROGRAM_USER_COURSE_PROVIDER,
  UpdateProgramUserCourseDto,
} from './program_user_course.dto';
import { BaseService } from '../../base/base.service';
import { ProgramUserCourse } from './program_user_course.entity';
import { BaseRepo } from '../../base/base.repository';
import { PAYMENT_STATUS_ENUM } from '../payment_status/payment_status.dto';
import { PROGRAM_PAYMENT_PROVIDER } from '../program_payment/program_payment.dto';
import { ProgramPayment } from '../program_payment/program_payment.entity';

@Injectable()
export class ProgramUserCourseService extends BaseService<
  ProgramUserCourse,
  CreateProgramUserCourseDto,
  UpdateProgramUserCourseDto
> {
  @Inject(PROGRAM_USER_COURSE_PROVIDER) repository: BaseRepo<ProgramUserCourse>;
  @Inject(PROGRAM_PAYMENT_PROVIDER) programPayment: BaseRepo<ProgramPayment>;

  async availableCredits(input: AvailableCreditsDto): Promise<number> {
    const programPayment = await this.programPayment
      .createQueryBuilder('program_payment')
      .select('program_payment.credits')
      .where('user_id = :user_id AND program_id = :program_id', {
        user_id: input.user_id,
        program_id: input.program_id,
      })
      .leftJoinAndSelect('program_payment.payments', 'payment')
      .andWhere('payment_state_id = :payment_state_id', {
        payment_state_id: PAYMENT_STATUS_ENUM.APPROVED,
      })
      .getMany();

    const programPaymentCredits: number[] = await programPayment.map(
      (item) => item.credits,
    );

    const programUserCourse = await this.repository
      .createQueryBuilder('program_users_course')
      .select('program_users_course.credits')
      .leftJoin('program_users_course.program_users', 'program_users')
      .andWhere(
        'program_users.program_id = :program_id AND program_users.user_id = :user_id',
        {
          program_id: input.program_id,
          user_id: input.user_id,
        },
      )
      .getMany();

    const programUserCourseCredits: number[] = await programUserCourse.map(
      (item) => item.credits,
    );
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return (
      programPaymentCredits.reduce(reducer) -
      programUserCourseCredits.reduce(reducer)
    );
  }
}
