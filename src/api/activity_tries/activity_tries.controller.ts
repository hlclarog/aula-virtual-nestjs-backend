import { Body, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { ActivityTriesService } from './activity_tries.service';
import { SetIntentUserDto } from './activity_tries.dto';
import { BaseController } from '../../base/base.controller';
import { ActivityTries } from './activity_tries.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from './../../utils/providers/info-user.module';

@ControllerApi({ name: 'activity_tries' })
export class ActivityTriesController extends BaseController<
  ActivityTries,
  SetIntentUserDto,
  null
> {
  constructor(
    private activity_triesService: ActivityTriesService,
    @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider,
  ) {
    super(activity_triesService);
  }

  @Get()
  async fetchAll() {
    return await this.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.findOne(id);
  }

  @Post()
  async post(@Body() createDto: SetIntentUserDto) {
    return await this.create(createDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
