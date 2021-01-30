import { Inject, Injectable } from '@nestjs/common';
import {
  CreateActivityMultipleOptionsDto,
  UpdateActivityMultipleOptionsDto,
  ACTIVITY_MULTIPLE_OPTIONS_PROVIDER,
} from './activity_multiple_options.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ActivityMultipleOptions } from './activity_multiple_options.entity';

@Injectable()
export class ActivityMultipleOptionsService extends BaseService<
  ActivityMultipleOptions,
  CreateActivityMultipleOptionsDto,
  UpdateActivityMultipleOptionsDto
> {
  @Inject(ACTIVITY_MULTIPLE_OPTIONS_PROVIDER)
  repository: BaseRepo<ActivityMultipleOptions>;
}
