import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersPositionGoalsService } from './users_position_goals.service';
import {
  CreateUsersPositionGoalsDto,
  UpdateUsersPositionGoalsDto,
} from './users_position_goals.dto';
import { BaseController } from '../../base/base.controller';
import { UsersPositionGoals } from './users_position_goals.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'users_position_goals' })
export class UsersPositionGoalsController extends BaseController<
  UsersPositionGoals,
  CreateUsersPositionGoalsDto,
  UpdateUsersPositionGoalsDto
> {
  constructor(
    protected users_position_goalsService: UsersPositionGoalsService,
  ) {
    super(users_position_goalsService);
  }

  @Post()
  async post(@Body() createDto: CreateUsersPositionGoalsDto) {
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
    @Body() updateDto: UpdateUsersPositionGoalsDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
