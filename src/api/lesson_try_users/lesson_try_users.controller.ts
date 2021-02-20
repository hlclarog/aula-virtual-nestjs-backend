import { Body, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { LessonTryUsersService } from './lesson_try_users.service';
import {
  CreateLessonTryUsersDto,
  EndLessonTryUsersDto,
} from './lesson_try_users.dto';
import { BaseController } from '../../base/base.controller';
import { LessonTryUsers } from './lesson_try_users.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from './../../utils/providers/info-user.module';

@ControllerApi({ name: 'lesson_try_users' })
export class LessonTryUsersController extends BaseController<
  LessonTryUsers,
  CreateLessonTryUsersDto,
  EndLessonTryUsersDto
> {
  constructor(
    private lesson_try_usersService: LessonTryUsersService,
    @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider,
  ) {
    super(lesson_try_usersService);
  }

  @Get()
  async fetchAll() {
    return await this.findAll();
  }

  @Get('lesson/list/:id')
  async findAllByLesson(@Param('id') id: number) {
    const result = await this.lesson_try_usersService.findAllByLessonActivity(
      id,
    );
    return { data: result };
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.findOne(id);
  }

  @Post()
  async post(@Body() createDto: CreateLessonTryUsersDto) {
    createDto.user_id = this.infoUser.id;
    return await this.create(createDto);
  }

  @Put('end/:id')
  async end(@Param('id') id: string, @Body() updateDto: EndLessonTryUsersDto) {
    return await this.update(id, { ...updateDto, percent: 100 });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
