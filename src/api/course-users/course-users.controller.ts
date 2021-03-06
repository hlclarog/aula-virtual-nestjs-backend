import { Body, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { BaseController } from '../../base/base.controller';
import { CourseUsers } from './course-users.entity';
import { CourseUsersService } from './course-users.service';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { CreateCourseUsersDto, UpdateCourseUsersDto } from './course-users.dto';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from 'src/utils/providers/info-user.module';

@ControllerApi({ name: 'course-users' })
export class CourseUsersController extends BaseController<
  CourseUsers,
  CreateCourseUsersDto,
  UpdateCourseUsersDto
> {
  constructor(
    @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider,
    private readonly courseUsersService: CourseUsersService,
  ) {
    super(courseUsersService);
  }

  @Post()
  async post(@Body() createDto: CreateCourseUsersDto) {
    return await this.courseUsersService.set(createDto);
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateCourseUsersDto) {
    return await this.update(id, updateDto);
  }

  @Put('favorite/:course_id/:condition')
  async setFavorite(
    @Param('course_id') course_id: number,
    @Param('condition') condition: boolean,
  ) {
    return await this.courseUsersService.setFavorite(
      this.infoUser.id,
      course_id,
      condition,
    );
  }

  @Put('score/:course_id/:qualification')
  async setScore(
    @Param('course_id') course_id: number,
    @Param('qualification') qualification: number,
  ) {
    return await this.courseUsersService.setScore(
      this.infoUser.id,
      course_id,
      qualification,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }

  @Get('course/:id')
  async getByCourse(@Param('id') id: number) {
    const result = await this.courseUsersService.findByCourse(id);
    return { data: result };
  }
}
