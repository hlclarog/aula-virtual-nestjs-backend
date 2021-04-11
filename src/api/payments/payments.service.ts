import { Inject, Injectable } from '@nestjs/common';
import {
  AddExternalCollection,
  CreateCurrencyDto,
  PAYMENTS_PROVIDER,
  UpdateCurrencyDto,
} from './payments.dto';
import { BaseService } from '../../base/base.service';
import { Payments } from './payments.entity';
import { BaseRepo } from '../../base/base.repository';
import { PROGRAM_PAYMENT_PROVIDER } from '../program_payment/program_payment.dto';
import { ProgramPayment } from '../program_payment/program_payment.entity';
import { PAYMENT_STATUS_ENUM } from '../payment_status/payment_status.dto';
import { COLLECTION_TYPES_ENUM } from '../collection_types/collection_types.dto';
import { Programs } from '../programs/programs.entity';
import { PROGRAMS_PROVIDER } from '../programs/programs.dto';

@Injectable()
export class PaymentsService extends BaseService<
  Payments,
  CreateCurrencyDto,
  UpdateCurrencyDto
> {
  @Inject(PAYMENTS_PROVIDER) repository: BaseRepo<Payments>;
  @Inject(PROGRAM_PAYMENT_PROVIDER) programPayment: BaseRepo<ProgramPayment>;
  @Inject(PROGRAMS_PROVIDER) programs: BaseRepo<Programs>;

  async externalCollection(input: AddExternalCollection) {
    const paymentData: Partial<Payments> = {
      payment_state_id: PAYMENT_STATUS_ENUM.APPROVED,
      collection_type_id: COLLECTION_TYPES_ENUM.EXTERNAL,
      currency_type_id: input.currency_type_id,
      processed_date: input.processed_date,
      paid_date: input.paid_date,
      description: input.description,
    };
    const paymentsSave = await this.repository.save(paymentData);
    console.log(paymentsSave);

    const program = await this.programs.findOne({
      where: { id: input.program_id },
      relations: ['program_courses'],
    });

    const credits: number[] = program.program_courses.map((f) => f.credits);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    const programPaymentData: Partial<ProgramPayment> = {
      program_id: input.program_id,
      user_id: input.user_id,
      payment_id: paymentsSave.id,
      credits: credits.reduce(reducer),
      description: input.description,
    };

    return await this.programPayment.save(programPaymentData);
  }
}