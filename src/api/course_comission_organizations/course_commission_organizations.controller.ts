import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CourseCommissionOrganizationsService } from './course_commission_organizations.service';

import { BaseController } from '../../base/base.controller';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { CourseCommissionOrganizations } from './course_commission_organizations.entity';
import {
  CreateCourseCommissionOrganizationsDto,
  UpdateCourseCommissionOrganizationsDto,
} from './course_commission_organizations.dto';

@ControllerApi({ name: 'course_commission_organizations' })
export class CourseCommissionOrganizationsController extends BaseController<
  CourseCommissionOrganizations,
  CreateCourseCommissionOrganizationsDto,
  UpdateCourseCommissionOrganizationsDto
> {
  constructor(
    private courseCommissionOrganizationsService: CourseCommissionOrganizationsService,
  ) {
    super(courseCommissionOrganizationsService);
  }

  @Post()
  async post(@Body() createDto: CreateCourseCommissionOrganizationsDto) {
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
    @Body() updateDto: UpdateCourseCommissionOrganizationsDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }

  @Get('course/:id')
  async getByCourse(@Param('id') id: number) {
    const result = await this.courseCommissionOrganizationsService.findByCourse(
      id,
    );
    return { data: result };
  }
}
