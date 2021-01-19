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
import { EnrollmentStatus } from './enrollment-status.entity';
import {
  CreateEnrollmentStatusDto,
  UpdateEnrollmentStatusDto,
} from './enrollment-status.dto';

@Controller('enrollment-status')
export class EnrollmentStatusController extends BaseController<
  EnrollmentStatus,
  CreateEnrollmentStatusDto,
  UpdateEnrollmentStatusDto
> {
  constructor(private readonly coursesService: CoursesService) {
    super(coursesService);
  }

  @Post()
  async post(@Body() createDto: CreateEnrollmentStatusDto) {
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
    @Body() updateDto: UpdateEnrollmentStatusDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
