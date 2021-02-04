import { Inject, Injectable } from '@nestjs/common';
import {
  CreateActivityTryUsersDto,
  ACTIVITY_TRY_USERS_PROVIDER,
} from './activity_try_users.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ActivityTryUsers } from './activity_try_users.entity';

@Injectable()
export class ActivityTryUsersService extends BaseService<
  ActivityTryUsers,
  CreateActivityTryUsersDto,
  null
> {
  @Inject(ACTIVITY_TRY_USERS_PROVIDER)
  repository: BaseRepo<ActivityTryUsers>;
}
