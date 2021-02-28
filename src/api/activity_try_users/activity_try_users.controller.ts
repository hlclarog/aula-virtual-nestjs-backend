import { Body, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ActivityTryUsersService } from './activity_try_users.service';
import {
  CreateActivityTryUsersDto,
  EndActivityTryUsersDto,
} from './activity_try_users.dto';
import { BaseController } from '../../base/base.controller';
import { ActivityTryUsers } from './activity_try_users.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from './../../utils/providers/info-user.module';

@ControllerApi({ name: 'activity_try_users' })
export class ActivityTryUsersController extends BaseController<
  ActivityTryUsers,
  CreateActivityTryUsersDto,
  EndActivityTryUsersDto
> {
  constructor(
    private activity_try_usersService: ActivityTryUsersService,
    @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider,
  ) {
    super(activity_try_usersService);
  }

  @Get()
  async fetchAll() {
    return await this.findAll();
  }

  @Get('lesson_activity/list/:id')
  async findAllByLesson(@Param('id') id: number) {
    const result = await this.activity_try_usersService.findAllByLessonActivity(
      id,
    );
    return { data: result };
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.findOne(id);
  }

  @Post()
  async post(@Body() createDto: CreateActivityTryUsersDto) {
    createDto.user_id = this.infoUser.id;
    return await this.create(createDto);
  }

  @Put('end/:id')
  async end(
    @Param('id') id: string,
    @Body() updateDto: EndActivityTryUsersDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
