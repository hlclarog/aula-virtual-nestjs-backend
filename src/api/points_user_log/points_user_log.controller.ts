import { Body, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { PointsUserLogService } from './points_user_log.service';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from './../../utils/providers/info-user.module';
import { BuyLivesDto } from './points_user_log.dto';

@ControllerApi({ name: 'points_user_log' })
export class PointsUserLogController {
  constructor(
    @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider,
    private points_user_logService: PointsUserLogService,
  ) {}

  @Get('user/:id')
  async findForUser(@Param('id') id: number) {
    const result = await this.points_user_logService.findForUser(id);
    return { data: result };
  }

  @Post('buy_lives')
  async buyLives(@Body() dataBuy: BuyLivesDto) {
    dataBuy.user_id = this.infoUser.id;
    const result = await this.points_user_logService.buy_lives(dataBuy);
    return { data: result };
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.points_user_logService.remove(id);
  }
}
