import { Inject, Injectable } from '@nestjs/common';
import {
  CreateActivityTypesDto,
  UpdateActivityTypesDto,
  ACTIVITY_TYPES_PROVIDER,
} from './activity_types.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ActivityTypes } from './activity_types.entity';

@Injectable()
export class ActivityTypesService extends BaseService<
  ActivityTypes,
  CreateActivityTypesDto,
  UpdateActivityTypesDto
> {
  @Inject(ACTIVITY_TYPES_PROVIDER) repository: BaseRepo<ActivityTypes>;
}
