import { Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProgramUserCourseService } from './program_user_course.service';
import { BaseController } from '../../base/base.controller';
import { ProgramUserCourse } from './program_user_course.entity';
import {
  AvailableCreditsDto,
  CreateProgramUserCourseDto,
  UpdateProgramUserCourseDto,
} from './program_user_course.dto';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'program_user_course' })
export class ProgramUserCourseController extends BaseController<
  ProgramUserCourse,
  CreateProgramUserCourseDto,
  UpdateProgramUserCourseDto
> {
  constructor(
    private readonly program_user_courseService: ProgramUserCourseService,
  ) {
    super(program_user_courseService);
  }
  @Post()
  async post(@Body() createDto: CreateProgramUserCourseDto) {
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

  @Put(':id')
  async edit(
    @Param('id') id: string,
    @Body() updateDto: UpdateProgramUserCourseDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }

  @Post('/validate/available_credits')
  async availableCredits(@Body() input: AvailableCreditsDto) {
    const response = await this.program_user_courseService.availableCredits(input);
    return { data: response };
  }
}
