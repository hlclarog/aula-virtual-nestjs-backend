import { Body, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { LessonCommentsService } from './lesson_comments.service';
import {
  CreateLessonCommentsDto,
  UpdateLessonCommentsDto,
} from './lesson_comments.dto';
import { BaseController } from '../../base/base.controller';
import { LessonComments } from './lesson_comments.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from './../../utils/providers/info-user.module';

@ControllerApi({ name: 'lesson_comments' })
export class LessonCommentsController extends BaseController<
  LessonComments,
  CreateLessonCommentsDto,
  UpdateLessonCommentsDto
> {
  constructor(
    protected lesson_commentsService: LessonCommentsService,
    @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider,
  ) {
    super(lesson_commentsService);
  }

  @Post()
  async post(@Body() createDto: CreateLessonCommentsDto) {
    createDto.user_id = this.infoUser.id;
    return await this.lesson_commentsService.create(createDto);
  }

  @Get()
  async fetchAll() {
    return await this.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.findOne(id);
  }

  @Get('course_lesson/:id')
  async getByCourseLesson(@Param('id') id: number) {
    const result = await this.lesson_commentsService.getByCourseLesson(id);
    return {
      data: result,
    };
  }

  @Get('course/:id')
  async getByCourse(@Param('id') id: number) {
    const result = await this.lesson_commentsService.getByCourse(
      id,
      this.infoUser.id,
    );
    return {
      data: result,
    };
  }

  @Get('lesson_student/:id')
  async getByCourseLessonForStudent(@Param('id') id: number) {
    const result = await this.lesson_commentsService.getByCourseLessonForStudent(
      id,
      this.infoUser.id,
    );
    return {
      data: result,
    };
  }

  @Put(':id')
  async edit(
    @Param('id') id: string,
    @Body() updateDto: UpdateLessonCommentsDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
