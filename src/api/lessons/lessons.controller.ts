import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { BaseController } from '../../base/base.controller';
import { Lessons } from './lessons.entity';
import {
  CopyLessonsDto,
  CreateLessonsDto,
  LESSON_PERMISSIONS,
  UpdateLessonsDto,
} from './lessons.dto';
import { Body, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import {
  InfoUserProvider,
  INFO_USER_PROVIDER,
} from './../../utils/providers/info-user.module';
import { LessonTryUsersService } from '../lesson_try_users/lesson_try_users.service';
import { getActualDate } from './../../utils/date';
import { AuthorizationsUserService } from './../../utils/services/authorizations-user.service';

@ControllerApi({ name: 'lessons' })
export class LessonsController extends BaseController<
  Lessons,
  CreateLessonsDto,
  UpdateLessonsDto
> {
  constructor(
    private lessonsService: LessonsService,
    private lesson_try_usersService: LessonTryUsersService,
    private authorizationsUserService: AuthorizationsUserService,
    @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider,
  ) {
    super(lessonsService);
  }

  @Post()
  async post(@Body() createDto: CreateLessonsDto) {
    createDto.user_id = this.infoUser.id;
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

  @Get('student/:course_lesson_id')
  async student(@Param('course_lesson_id') course_lesson_id: number) {
    const result = await this.lessonsService.findLessonForStudent(
      course_lesson_id,
      this.infoUser.id,
    );
    await this.lesson_try_usersService.start({
      user_id: this.infoUser.id,
      course_lesson_id,
      begin: getActualDate(),
    });
    return { data: result };
  }

  @Put(':id')
  async edit(@Param('id') id: string, @Body() updateDto: UpdateLessonsDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }

  @Get('course/:id')
  async getByCourse(@Param('id') id: number) {
    const result = await this.lessonsService.findByCourse(id);
    return { data: result };
  }

  @Get('progress/course/:id')
  async findProgessByCourse(@Param('id') id: number) {
    const result = await this.lessonsService.findProgessByCourse(
      [id],
      this.infoUser.id,
    );
    return { data: result };
  }

  @Get('course_progress/:course_id/:user_id')
  async findProgessByUser(
    @Param('course_id') course_id: number,
    @Param('user_id') user_id: number,
  ) {
    try {
      await this.authorizationsUserService.accesAction(
        [LESSON_PERMISSIONS.GET_ALL_PROGRESS],
        this.infoUser.id,
      );
    } catch (error) {
      user_id = this.infoUser.id;
    }
    const result = await this.lessonsService.findProgessByCourse(
      [course_id],
      user_id,
    );
    return { data: result.length > 0 ? result[0] : {} };
  }

  @Get('copy/search/:type/:name')
  async searchLessonsCopyDto(
    @Param('type') type: string,
    @Param('name') name: string,
  ) {
    let result = [];
    switch (type) {
      case 'courses':
        result = await this.lessonsService.searchLessonsForCoursesToCopy(
          name,
          this.infoUser.id,
        );
        break;
      case 'lessons':
        result = await this.lessonsService.searchLessonsToCopy(
          name,
          this.infoUser.id,
        );
        break;
    }
    return { data: result };
  }

  @Post('copy')
  async copyLessonsDto(@Body() body: CopyLessonsDto) {
    const result = await this.lessonsService.copyLessons(body);
    return { data: result };
  }

  @Post('reuse')
  async reuseLessonsDto(@Body() body: CopyLessonsDto) {
    const result = await this.lessonsService.reuseLessons(body);
    return { data: result };
  }
}
