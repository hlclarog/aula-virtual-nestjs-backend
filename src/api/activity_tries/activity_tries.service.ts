import { Inject, Injectable } from '@nestjs/common';
import {
  SetIntentUserDto,
  ACTIVITY_TRIES_PROVIDER,
} from './activity_tries.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ActivityTries } from './activity_tries.entity';

@Injectable()
export class ActivityTriesService extends BaseService<
  ActivityTries,
  SetIntentUserDto,
  null
> {
  @Inject(ACTIVITY_TRIES_PROVIDER)
  repository: BaseRepo<ActivityTries>;
}
