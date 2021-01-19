import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CoursesService } from '../courses/courses.service';
import { BaseController } from '../../base/base.controller';
import { EnrollmentTypes } from './enrollment-types.entity';
import {
  CreateEnrollmentTypesDto,
  UpdateEnrollmentTypesDto,
} from './enrollment-types.dto';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'enrollment-types' })
export class EnrollmentTypesController extends BaseController<
  EnrollmentTypes,
  CreateEnrollmentTypesDto,
  UpdateEnrollmentTypesDto
> {
  constructor(private readonly coursesService: CoursesService) {
    super(coursesService);
  }

  @Post()
  async post(@Body() createDto: CreateEnrollmentTypesDto) {
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
  async edit(
    @Param('id') id: string,
    @Body() updateDto: UpdateEnrollmentTypesDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
