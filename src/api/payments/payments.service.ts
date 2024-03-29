import { Inject, Injectable } from '@nestjs/common';
import {
  AddExternalCollectionDto,
  CreatePaymentsDto,
  InternalCollectionCourseStudent,
  InternalCollectionStudentDto,
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
import {
  EnrollmentProgramUsersDto,
  PROGRAM_USERS_PROVIDER,
} from '../program_users/program_users.dto';
import { ProgramUsers } from '../program_users/program_users.entity';
import { ProgramFeeSchedulesService } from '../program_fee_schedules/program_fee_schedules.service';
import { ProgramUsersService } from '../program_users/program_users.service';
import { ENROLLMENT_STATUS_ENUM } from '../enrollment-status/enrollment-status.dto';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from '../../utils/providers/info-user.module';
import { CryptoService } from '../../utils/services/crypto.service';
import { generate, generateCourseCode } from '../../utils/random';
import { CourseFeeScheduleService } from '../course-fee-schedule/course-fee-schedule.service';
import { CoursePayments } from '../course_payments/course_payments.entity';
import { COURSE_PAYMENTS_PROVIDER } from '../course_payments/course_payments.dto';

@Injectable()
export class PaymentsService extends BaseService<
  Payments,
  CreatePaymentsDto,
  UpdatePaymentsDto
> {
  @Inject(PAYMENTS_PROVIDER) repository: BaseRepo<Payments>;
  @Inject(PROGRAM_PAYMENT_PROVIDER) programPayment: BaseRepo<ProgramPayment>;
  @Inject(COURSE_PAYMENTS_PROVIDER) coursePayment: BaseRepo<CoursePayments>;
  @Inject(PROGRAMS_PROVIDER) programs: BaseRepo<Programs>;
  @Inject(PROGRAM_USERS_PROVIDER) programUsers: BaseRepo<ProgramUsers>;
  @Inject(INFO_USER_PROVIDER) infoUser: InfoUserProvider;

  constructor(
    private readonly awsService: AwsService,
    private readonly programFeeSchedulesService: ProgramFeeSchedulesService,
    private readonly courseFeeSchedulesService: CourseFeeScheduleService,
    private readonly programUsersService: ProgramUsersService,
    private readonly cryptoService: CryptoService,
  ) {
    super();
  }

  async externalCollection(input: AddExternalCollectionDto) {
    const programFeeSchedules = await this.getProgramFeeSchedules(input);
    const paymentData: Partial<Payments> = {
      payment_state_id: PAYMENT_STATUS_ENUM.APPROVED,
      collection_type_id: COLLECTION_TYPES_ENUM.EXTERNAL,
      quantity:
        (programFeeSchedules.program.by_credit
          ? Number(programFeeSchedules.program_val) * input.credits
          : Number(programFeeSchedules.program_val)) +
        Number(programFeeSchedules.inscription_val),
      currency_type_id: input.currency_type_id,
      organization_id: input.organization_id ?? null,
      transaction_reference: input.transaction_reference ?? null,
      transaction_code: input.transaction_code ?? null,
      transaction_date: input.transaction_date ?? null, // Genero el Recibo para pagar => transaction_date
      paid_date: input.paid_date ?? null, // Pague Al día siguiente en Baloto => paid_date
      processed_date: input.processed_date ?? null, // Payu es notificado por Baloto al tercer día => processed_date
      description: input.description ?? null,
      bank: input.bank ?? null,
      snapshot: input.snapshot ?? null,
    };
    const paymentsSave = await this.addPayment(paymentData);

    await this.addProgramPayment(input, paymentsSave);

    const programUserData: EnrollmentProgramUsersDto = {
      program_id: input.program_id,
      user_id: input.user_id,
      enrollment_status_id: ENROLLMENT_STATUS_ENUM.REGISTERED,
    };

    return await this.programUsersService.addEnrollment(programUserData);
  }

  async addPayment(paymentData: Partial<Payments>) {
    if (paymentData.collection_file) {
      paymentData.collection_file = await this.setFile(
        paymentData.collection_file,
        typeFilesAwsNames.payments_collection,
      );
    }
    return await this.repository.save(paymentData);
  }

  async addProgramPayment(
    input: Partial<AddExternalCollectionDto>,
    paymentsSave: Partial<Payments>,
  ) {
    const programPaymentData: Partial<ProgramPayment> = {
      program_id: input.program_id,
      user_id: input.user_id,
      description: input.description,
      credits: input.credits,
      payment_id: paymentsSave.id,
    };
    return await this.programPayment.save(programPaymentData);
  }
  async addCourseToPayment(
    input: Partial<InternalCollectionCourseStudent>,
    paymentSave: Partial<Payments>,
  ) {
    const coursePaymentData: Partial<CoursePayments> = {
      course_id: input.course_id,
      user_id: input.user_id,
      payment_id: paymentSave.id,
    };
    return await this.coursePayment.save(coursePaymentData);
  }

  async setFile(file, type) {
    const result = await this.awsService.saveFile({
      file,
      name: shortid.generate(),
      type,
    });
    return result.Key;
  }

  async paymentGenerationCourse(
    input: InternalCollectionCourseStudent,
    type: number,
  ) {
    const courseFeeSchedule = await this.courseFeeSchedulesService.amountToPay(
      input.course_id,
      input.currency_id,
      input.transaction_date,
    );
    const paymentData: Partial<Payments> = {
      payment_state_id: PAYMENT_STATUS_ENUM.PENDING,
      collection_type_id: COLLECTION_TYPES_ENUM.INTERNAL,
      quantity: Number(
        type == 1
          ? courseFeeSchedule.course_val
          : courseFeeSchedule.certificate_val,
      ),
      currency_type_id: input.currency_id,
      transaction_reference: generateCourseCode(
        type,
        input.user_id,
        input.course_id,
      ),
    };
    const paymentsSave = await this.addPayment(paymentData);
    await this.addCourseToPayment(input, paymentsSave);
    return this.getCheckoutData(paymentsSave);
  }

  async internalCollectionStudent(input: InternalCollectionStudentDto) {
    input.user_id = this.infoUser.id;
    const programFeeSchedules = await this.getProgramFeeSchedules(input);
    const paymentData: Partial<Payments> = {
      payment_state_id: PAYMENT_STATUS_ENUM.PENDING,
      collection_type_id: COLLECTION_TYPES_ENUM.INTERNAL,
      quantity:
        (programFeeSchedules.program.by_credit
          ? Number(programFeeSchedules.program_val) * input.credits
          : Number(programFeeSchedules.program_val)) +
        Number(programFeeSchedules.inscription_val),
      currency_type_id: input.currency_type_id,
      organization_id: input.organization_id ?? null,
      transaction_reference: 'PROGRAM-' + this.generateCode(),
      transaction_code: input.transaction_code ?? null,
      transaction_date: input.transaction_date ?? null, // Genero el Recibo para pagar => transaction_date
      paid_date: input.paid_date ?? null, // Pague Al día siguiente en Baloto => paid_date
      processed_date: input.processed_date ?? null, // Payu es notificado por Baloto al tercer día => processed_date
      description: input.description ?? null,
      bank: input.bank ?? null,
      snapshot: input.snapshot ?? null,
    };
    const paymentsSave = await this.addPayment(paymentData);
    await this.addProgramPayment(input, paymentsSave);
    return this.getCheckoutData(paymentsSave);
  }

  async getCheckoutData(payment: Payments) {
    return {
      merchantId: '508029',
      accountId: '512321',
      description: payment.description,
      referenceCode: payment.transaction_reference,
      amount: payment.quantity,
      tax: 0,
      taxReturnBase: 0,
      currency: 'COP',
      signature: this.cryptoService.hashSignature(
        '4Vj8eK4rloUd272L48hsrarnUA' +
          '~' +
          '508029' +
          '~' +
          payment.transaction_reference +
          '~' +
          Number(payment.quantity) +
          '~' +
          'COP',
      ),
      test: 1,
      buyerEmail: this.infoUser.email,
      apiPayu: 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/',
      responseUrl:
        'https://apidev.omarenco.com/payment/web_checkout/payu/cua/response',
      confirmationUrl:
        'https://apidev.omarenco.com/payment/web_checkout/payu/cua/confirmation',
    };
  }

  async getProgramFeeSchedules(input: InternalCollectionStudentDto) {
    return await this.programFeeSchedulesService.amountToPay(
      input.program_id,
      input.currency_type_id,
      input.transaction_date,
    );
  }

  generateCode() {
    return generate(5);
  }
}
