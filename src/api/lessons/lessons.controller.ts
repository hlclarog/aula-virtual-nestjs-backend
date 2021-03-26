import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { BaseController } from '../../base/base.controller';
import { Lessons } from './lessons.entity';
import {
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

  @Get('student/:id')
  async student(@Param('id') id: number) {
    const result = await this.lessonsService.findLessonForStudent(
      id,
      this.infoUser.id,
    );
    await this.lesson_try_usersService.start({
      user_id: this.infoUser.id,
      lesson_id: id,
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

  @Post('change/order')
  async changeOrder(@Body() body: any) {
    const result = await this.lessonsService.changeOrder(body);
    return { data: result };
  }
}
