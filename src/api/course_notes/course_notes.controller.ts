import { Body, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { BaseController } from '../../base/base.controller';
import { CourseNotes } from './course_notes.entity';
import { CourseNotesService } from './course_notes.service';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { CreateCourseNotesDto, UpdateCourseNotesDto } from './course_notes.dto';
import {
  InfoUserProvider,
  INFO_USER_PROVIDER,
} from './../../utils/providers/info-user.module';

@ControllerApi({ name: 'course_notes' })
export class CourseNotesController extends BaseController<
  CourseNotes,
  CreateCourseNotesDto,
  UpdateCourseNotesDto
> {
  constructor(
    @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider,
    private readonly courseNotesService: CourseNotesService,
  ) {
    super(courseNotesService);
  }

  @Get()
  async fetchAll() {
    const result = await this.courseNotesService.findAllForUser(
      this.infoUser.id,
    );
    return { data: result };
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    const result = await this.courseNotesService.findOne(id);
    return { data: result };
  }

  @Get('course/:course_id')
  async findForCourse(@Param('course_id') course_id: number) {
    const result = await this.courseNotesService.findAllForCourse(
      this.infoUser.id,
      course_id,
    );
    return { data: result };
  }

  @Post()
  async post(@Body() createDto: CreateCourseNotesDto) {
    createDto.user_id = this.infoUser.id;
    const result = await this.courseNotesService.create(createDto);
    return { data: result };
  }

  @Put(':id')
  async edit(@Param('id') id: number, @Body() updateDto: UpdateCourseNotesDto) {
    updateDto.user_id = this.infoUser.id;
    const result = await this.courseNotesService.update(id, updateDto);
    return { data: result };
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const result = await this.courseNotesService.removeForUser(
      id,
      this.infoUser.id,
    );
    return { data: result };
  }
}
