import { Body, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { PointsUserLogService } from './points_user_log.service';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from './../../utils/providers/info-user.module';
import {
  BuyLivesDto,
  FilterPointsUserLogDto,
  POINTS_USER_LOG_PERMISSIONS,
} from './points_user_log.dto';
import { AuthorizationsUserService } from './../../utils/services/authorizations-user.service';

@ControllerApi({ name: 'points_user_log' })
export class PointsUserLogController {
  constructor(
    private authorizationsUserService: AuthorizationsUserService,
    @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider,
    private points_user_logService: PointsUserLogService,
  ) {}

  @Put('filter')
  async findForFilters(@Body() filters: FilterPointsUserLogDto) {
    try {
      await this.authorizationsUserService.accesAction(
        [POINTS_USER_LOG_PERMISSIONS.GET_ALL_POINTS],
        this.infoUser.id,
      );
    } catch (error) {
      filters.user_id = this.infoUser.id;
    }
    const result = await this.points_user_logService.findFiltered(filters);
    return { data: result };
  }

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
