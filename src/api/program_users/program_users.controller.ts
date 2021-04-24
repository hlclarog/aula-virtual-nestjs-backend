import { Body, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { BaseController } from '../../base/base.controller';
import { ProgramUsers } from './program_users.entity';
import { ProgramUsersService } from './program_users.service';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import {
  CreateProgramUsersDto,
  EnrollmentProgramUsersDto,
  UpdateProgramUsersDto,
} from './program_users.dto';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from '../../utils/providers/info-user.module';

@ControllerApi({ name: 'program_users' })
export class ProgramUsersController extends BaseController<
  ProgramUsers,
  CreateProgramUsersDto,
  UpdateProgramUsersDto
> {
  constructor(
    private readonly programUsersService: ProgramUsersService,
    @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider,
  ) {
    super(programUsersService);
  }

  @Post()
  async post(@Body() createDto: CreateProgramUsersDto) {
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
    @Body() updateDto: UpdateProgramUsersDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }

  @Get('program/:id')
  async getByProgram(@Param('id') id: number) {
    const result = await this.programUsersService.findByProgram(id);
    return { data: result };
  }

  @Get('check_my_user/:id')
  async getCheckMyUser(@Param('id') id: number) {
    const result = await this.programUsersService.getProgramUsersByUser(
      id,
      this.infoUser.id,
    );
    return { data: result };
  }

  @Post('enrollment/program_user')
  async addEnrollment(@Body() input: EnrollmentProgramUsersDto) {
    const result = await this.programUsersService.addEnrollment(input);
    return {
      data: result,
    };
  }
}
