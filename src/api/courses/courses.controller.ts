import { Get, Post, Body, Put, Param, Delete, Inject } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { BaseController } from '../../base/base.controller';
import {
  COURSES_PERMISSIONS,
  CreateCourseByTeacherDto,
  CreateCourseDto,
  SubscribeCourseStudentDto,
  UpdateCourseDto,
} from './courses.dto';
import { Courses } from './courses.entity';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from '../../utils/providers/info-user.module';
import { AuthorizationsUserService } from './../../utils/services/authorizations-user.service';
import { CourseUsersService } from '../course-users/course-users.service';
import { InterestAreasService } from '../interest_areas/interest_areas.service';

@ControllerApi({ name: 'courses' })
export class CoursesController extends BaseController<
  Courses,
  CreateCourseDto,
  UpdateCourseDto
> {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly courseUsersService: CourseUsersService,
    private readonly interestAreasService: InterestAreasService,
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
    const result = await this.coursesService.find();
    return {
      data: result,
    };
  }

  @Get('catalog/:type')
  async fetchAllCatalog(@Param('type') type: string) {
    let result: any = [];
    switch (type) {
      case 'list':
        result = await this.coursesService.findAllCatalog(this.infoUser.id);
        break;
      case 'group':
        result = await this.interestAreasService.findGroup(
          this.infoUser.id,
          'all',
        );
        break;
    }
    return {
      data: result,
    };
  }

  @Get('student/:type')
  async fetchAllMyCourses(@Param('type') type: string) {
    let result: any = [];
    switch (type) {
      case 'list':
        result = await this.coursesService.findAllCatalog(
          this.infoUser.id,
          null,
          true,
        );
        break;
      case 'group':
        result = await this.interestAreasService.findGroup(
          this.infoUser.id,
          'student',
        );
        break;
    }
    return { data: result };
  }

  @Get('details/:id')
  async findDetailsCourse(@Param('id') id: number) {
    const result = await this.coursesService.findAllCatalog(
      this.infoUser.id,
      id,
    );
    return {
      data: result,
    };
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.findOne(id);
  }

  @Get('generate/code')
  async generateCode() {
    const result = await this.coursesService.generateCode();
    return {
      data: result,
    };
  }

  @Post('search/byName')
  async searchByRol(@Body() body: any) {
    const result = await this.coursesService.searchByName(body.name);
    return {
      data: result,
    };
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

  @Post('subscribe_student')
  async subscribeStudent(@Body() subscribeDto: SubscribeCourseStudentDto) {
    const result = await this.courseUsersService.create({
      course: subscribeDto.course,
      user: this.infoUser.id,
      begin_date: subscribeDto.begin_date,
    });
    return {
      data: result,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }

  @Get('teacher/:type')
  async getByTeacher(@Param('type') type: string) {
    let result = [];
    switch (type) {
      case 'list':
        result = await this.coursesService.findByTeacher(this.infoUser.id);
        break;
      case 'group':
        result = await this.interestAreasService.findGroup(
          this.infoUser.id,
          'teacher',
        );
        break;
    }
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
    updateDto.user_id = this.infoUser.id;
    return await this.update(id, updateDto);
  }
}
