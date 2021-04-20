import { Body, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ProgramCoursesService } from './program_courses.service';
import {
  CreateProgramCoursesDto,
  UpdateProgramCoursesDto,
} from './program_courses.dto';
import { BaseController } from '../../base/base.controller';
import { ProgramCourses } from './program_courses.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { INFO_USER_PROVIDER, InfoUserProvider } from '../../utils/providers/info-user.module';

@ControllerApi({ name: 'program_courses' })
export class ProgramCoursesController extends BaseController<
  ProgramCourses,
  CreateProgramCoursesDto,
  UpdateProgramCoursesDto
> {
  constructor(
    protected program_coursesService: ProgramCoursesService,
    @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider,
  ) {
    super(program_coursesService);
  }

  @Post()
  async post(@Body() createDto: CreateProgramCoursesDto) {
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
    @Body() updateDto: UpdateProgramCoursesDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }

  @Get('program/:id')
  async getByProgram(@Param('id') id: number) {
    const result = await this.program_coursesService.findByProgram(id);
    return { data: result };
  }
  @Get('user_program/:id')
  async userProgram(@Param('id') id: number) {
    const result = await this.program_coursesService.findByProgram(
      id,
      this.infoUser.id
    );
    return { data: result };
  }
}
