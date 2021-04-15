import { Inject, Injectable } from '@nestjs/common';
import {
  AddExternalCollection,
  CreatePaymentsDto,
  PAYMENTS_PROVIDER,
  UpdatePaymentsDto,
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
import { typeFilesAwsNames } from '../../aws/aws.dto';
import { AwsService } from '../../aws/aws.service';
import * as shortid from 'shortid';
import { PROGRAM_USERS_PROVIDER } from '../program_users/program_users.dto';
import { ProgramUsers } from '../program_users/program_users.entity';
import { ProgramFeeSchedulesService } from '../program_fee_schedules/program_fee_schedules.service';

@Injectable()
export class PaymentsService extends BaseService<
  Payments,
  CreatePaymentsDto,
  UpdatePaymentsDto
> {
  @Inject(PAYMENTS_PROVIDER) repository: BaseRepo<Payments>;
  @Inject(PROGRAM_PAYMENT_PROVIDER) programPayment: BaseRepo<ProgramPayment>;
  @Inject(PROGRAMS_PROVIDER) programs: BaseRepo<Programs>;
  @Inject(PROGRAM_USERS_PROVIDER) programUsers: BaseRepo<ProgramUsers>;

  constructor(
    private readonly awsService: AwsService,
    private readonly programFeeSchedulesService: ProgramFeeSchedulesService,
  ) {
    super();
  }

  async externalCollection(input: AddExternalCollection) {
    const program = await this.programs.findOne({
      where: { id: input.program_id },
      relations: ['program_courses'],
    });

    const credits: number[] = program.program_courses.map((f) => f.credits);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    const programFeeSchedules = await this.programFeeSchedulesService.amountToPay(
      program.id,
      input.currency_type_id,
      input.transaction_date,
    );

    const paymentData: Partial<Payments> = {
      payment_state_id: PAYMENT_STATUS_ENUM.APPROVED,
      collection_type_id: COLLECTION_TYPES_ENUM.EXTERNAL,
      currency_type_id: input.currency_type_id,
      organization_id: input.organization_id ?? null,
      transaction_reference: input.transaction_reference ?? null,
      transaction_code: input.transaction_code ?? null,
      transaction_date: input.transaction_date ?? null, // Genero el Recibo para pagar => transaction_date
      paid_date: input.paid_date ?? null, // Pague Al día siguiente en Baloto => paid_date
      processed_date: input.processed_date ?? null, // Payu es notificado por Baloto al tercer día => processed_date
      quantity:
        (programFeeSchedules.program.by_credit
          ? Number(programFeeSchedules.program_val) * input.credits
          : Number(programFeeSchedules.program_val)) +
        Number(programFeeSchedules.inscription_val),
      description: input.description ?? null,
      bank: input.bank ?? null,
      snapshot: input.snapshot ?? null,
    };

    if (input.collection_file) {
      paymentData.collection_file = await this.setFile(
        input.collection_file,
        typeFilesAwsNames.payments_collection,
      );
    }
    const paymentsSave = await this.repository.save(paymentData);

    const programPaymentData: Partial<ProgramPayment> = {
      program_id: input.program_id,
      user_id: input.user_id,
      payment_id: paymentsSave.id,
      description: input.description,
    };

    if (program) {
      if (program.by_credit) {
        if (input.credits > 0 && input.credits <= credits.reduce(reducer)) {
          programPaymentData.credits = input.credits;
        }
      } else {
        programPaymentData.credits = credits.reduce(reducer);
      }
    }

    return await this.programPayment.save(programPaymentData);

    // // TODO definir valores para adicionar registro program users
    // const programUsers: Partial<ProgramUsers> = {
    //   program_id: program.id,
    //   user_id: input.user_id,
    //   enrollment_status_id: 1,
    //   enrollment_type_id: 1,
    //   transaction_status_id: 1,
    // };
    //
    // return await this.programUsers.save(programUsers);
  }

  async setFile(file, type) {
    const result = await this.awsService.saveFile({
      file,
      name: shortid.generate(),
      type,
    });
    return result.Key;
  }
}
