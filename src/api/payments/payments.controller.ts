import { Get, Post, Body, Put, Param, Delete, Inject } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { BaseController } from '../../base/base.controller';
import { Payments } from './payments.entity';
import {
  AddExternalCollectionDto,
  CreatePaymentsDto,
  InternalCollectionCourseStudent,
  InternalCollectionStudentDto,
  UpdatePaymentsDto,
} from './payments.dto';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { PROGRAMS_PROVIDER } from '../programs/programs.dto';
import { BaseRepo } from '../../base/base.repository';
import { Programs } from '../programs/programs.entity';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from '../../utils/providers/info-user.module';

@ControllerApi({ name: 'payments' })
export class PaymentsController extends BaseController<
  Payments,
  CreatePaymentsDto,
  UpdatePaymentsDto
> {
  @Inject(PROGRAMS_PROVIDER) programs: BaseRepo<Programs>;
  constructor(
    private readonly paymentsService: PaymentsService,
    @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider,
  ) {
    super(paymentsService);
  }
  @Post()
  async post(@Body() createDto: CreatePaymentsDto) {
    return await this.create(createDto);
  }

  @Get()
  async fetchAll() {
    return await this.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.findOne(id);
  }

  @Put(':id')
  async edit(@Param('id') id: string, @Body() updateDto: UpdatePaymentsDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }

  @Post('/external/collection')
  async externalCollection(@Body() input: AddExternalCollectionDto) {
    const program = await this.programs.findOne({
      where: { id: input.program_id },
      relations: ['program_courses'],
    });
    const credits: number[] = program.program_courses.map((f) => f.credits);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    if (program) {
      if (program.by_credit) {
        if (input.credits < 0 && input.credits > credits.reduce(reducer)) {
          return { message: `credits don't Match` };
        }
      } else {
        input.credits = credits.reduce(reducer);
      }
      const response = await this.paymentsService.externalCollection(input);
      return { data: response };
    } else {
      return { message: 'Program Not Found' };
    }
  }

  @Post('program/internal/student')
  async internalCollectionStudent(@Body() input: InternalCollectionStudentDto) {
    const response = await this.paymentsService.internalCollectionStudent(
      input,
    );
    return { data: response };
  }

  @Post('course/collection/student')
  async internalCollectionCourseStudent(
    @Body() input: InternalCollectionCourseStudent,
  ) {
    return { data: await this.filterToCollectionStudent(input, 1) };
  }
  @Post('certificate/collection/student')
  async internalCollectionCertificateStudent(
    @Body() input: InternalCollectionCourseStudent,
  ) {
    return { data: await this.filterToCollectionStudent(input, 2) };
  }
  async filterToCollectionStudent(
    input: InternalCollectionCourseStudent,
    type: number,
  ) {
    input.transaction_date = new Date(Date.now()).toLocaleDateString(
      'zh-Hans-CN',
    );

    const response = await this.paymentsService.paymentGenerationCourse(
      this.infoUser.id,
      input,
      type,
    );
    return response;
  }
}
