import { Get, Post, Body, Put, Param, Delete, Inject } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { BaseController } from '../../base/base.controller';
import {
  CopyCourseDto,
  CreateCourseByTeacherDto,
  CreateCourseDto,
  SubscribeCourseStudentDto,
  UnSubscribeCourseStudentDto,
  UpdateCourseDto,
} from './courses.dto';
import { Courses } from './courses.entity';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from '../../utils/providers/info-user.module';
import { CourseUsersService } from '../course-users/course-users.service';
import { InterestAreasService } from '../interest_areas/interest_areas.service';
import { EnrollmentCourseUsersDto } from '../course-users/course-users.dto';

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

  @Get('student/detail/:id')
  async fetchCourseToStudent(@Param('id') id: number) {
    const result = await this.coursesService.findOneToStudent(
      id,
      this.infoUser.id,
    );
    return { data: result };
  }

  @Get('details/:course_id')
  async findDetailsCourse(@Param('course_id') course_id: number) {
    const result = await this.coursesService.findAllCatalog(
      this.infoUser.id,
      course_id,
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

  @Get('student/units_lessons/:id')
  async getUnitsLessonsFoStudent(@Param('id') id: number) {
    const result = await this.coursesService.getUnitsLessonsFoStudent(
      id,
      this.infoUser.id,
    );
    return {
      data: result,
    };
  }

  @Put(':id')
  async edit(@Param('id') id: string, @Body() updateDto: UpdateCourseDto) {
    await this.coursesService.validOwner(id, 7);
    return await this.update(id, updateDto);
  }

  @Post('subscribe_student')
  async subscribeStudent(@Body() subscribeDto: SubscribeCourseStudentDto) {
    const result = await this.courseUsersService.subscribe({
      course_id: subscribeDto.course_id,
      user_id: this.infoUser.id,
      begin_date: subscribeDto.begin_date,
    });
    return {
      data: result,
    };
  }

  @Post('unsubscribe_student')
  async unsubscribeStudent(@Body() subscribeDto: UnSubscribeCourseStudentDto) {
    const result = await this.courseUsersService.unSubscribe({
      course_id: subscribeDto.course_id,
      user_id: this.infoUser.id,
      end_date: subscribeDto.end_date,
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
    createDto.user_id = this.infoUser.id;
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

  @Post('enrollment/course_user')
  async addEnrollment(@Body() input: EnrollmentCourseUsersDto) {
    const result = await this.courseUsersService.addEnrollment(input);
    return {
      data: result,
    };
  }

  @Post('copy')
  async copyCourse(@Body() data: CopyCourseDto) {
    data.user_id = this.infoUser.id;
    const result = await this.coursesService.copyCourse(data);
    return {
      data: result,
    };
  }
}
