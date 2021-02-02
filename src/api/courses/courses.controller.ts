import { Get, Post, Body, Put, Param, Delete, Inject } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { BaseController } from '../../base/base.controller';
import {
  COURSES_PERMISSIONS,
  CreateCourseByTeacherDto,
  CreateCourseDto,
  UpdateCourseDto,
} from './courses.dto';
import { Courses } from './courses.entity';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from '../../utils/providers/info-user.module';
import { AuthorizationsUserService } from './../../utils/services/authorizations-user.service';

@ControllerApi({ name: 'courses' })
export class CoursesController extends BaseController<
  Courses,
  CreateCourseDto,
  UpdateCourseDto
> {
  constructor(
    private readonly coursesService: CoursesService,
    private authorizationsUserService: AuthorizationsUserService,
    @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider,
  ) {
    super(coursesService);
  }

  @Post()
  async post(@Body() createDto: CreateCourseDto) {
    return await this.create(createDto);
  }

  @Get()
  async fetchAll() {
    return await this.findAll();
  }

  @Get('generate/code')
  async generateCode() {
    const result = await this.coursesService.generateCode();
    return {
      data: result,
    };
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.findOne(id);
  }

  @Get('units_lessons/:id')
  async getUnitsLessons(@Param('id') id: number) {
    const result = await this.coursesService.getUnitsLessons(id);
    return {
      data: result,
    };
  }

  @Put(':id')
  async edit(@Param('id') id: string, @Body() updateDto: UpdateCourseDto) {
    const user = (await this.coursesService.findOne(Number(id))).user_id;
    await this.authorizationsUserService.accesAction(
      [COURSES_PERMISSIONS.MANAGER],
      user,
    );
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }

  @Post('search/byName')
  async searchByRol(@Body() body: any) {
    const result = await this.coursesService.searchByName(body.name);
    return {
      data: result,
    };
  }

  @Get('teacher/list')
  async getByTeacher() {
    const result = await this.coursesService.findByTeacher(this.infoUser.id);
    return { data: result };
  }

  @Post('teacher')
  async postByTeacher(@Body() createDto: CreateCourseByTeacherDto) {
    createDto.user = this.infoUser.id;
    const data: any = createDto;
    return await this.create(data);
  }

  @Put('teacher/:id')
  async editByTeacher(
    @Param('id') id: string,
    @Body() updateDto: UpdateCourseDto,
  ) {
    updateDto.user = this.infoUser.id;
    return await this.update(id, updateDto);
  }
}
