import { Get, Post, Body, Put, Param, Delete, Inject } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { BaseController } from '../../base/base.controller';
import { Payments } from './payments.entity';
import {
  AddExternalCollection,
  CreatePaymentsDto,
  UpdatePaymentsDto,
} from './payments.dto';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { PROGRAMS_PROVIDER } from '../programs/programs.dto';
import { BaseRepo } from '../../base/base.repository';
import { Programs } from '../programs/programs.entity';

@ControllerApi({ name: 'payments' })
export class PaymentsController extends BaseController<
  Payments,
  CreatePaymentsDto,
  UpdatePaymentsDto
> {
  @Inject(PROGRAMS_PROVIDER) programs: BaseRepo<Programs>;
  constructor(private readonly paymentsService: PaymentsService) {
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
  async externalCollection(@Body() input: AddExternalCollection) {
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
}
