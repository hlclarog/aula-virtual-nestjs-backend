import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CourseComissionOrganizationsService } from './course_comission_organizations.service';
import {
  CreateCourseComissionOrganizationsDto,
  UpdateCourseComissionOrganizationsDto,
} from './course_comission_organizations.dto';
import { BaseController } from '../../base/base.controller';
import { CourseComissionOrganizations } from './course_comission_organizations.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'course_comission_organizations' })
export class CourseComissionOrganizationsController extends BaseController<
  CourseComissionOrganizations,
  CreateCourseComissionOrganizationsDto,
  UpdateCourseComissionOrganizationsDto
> {
  constructor(course_comission_organizationsService: CourseComissionOrganizationsService) {
    super(course_comission_organizationsService);
  }

  @Post()
  async post(@Body() createDto: CreateCourseComissionOrganizationsDto) {
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
    @Body() updateDto: UpdateCourseComissionOrganizationsDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
