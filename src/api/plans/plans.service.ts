import { Inject, Injectable } from '@nestjs/common';
import { CreatePlansDto, UpdatePlansDto, PLANS_PROVIDER } from './plans.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { Plans } from './plans.entity';

@Injectable()
export class PlansService extends BaseService<
  Plans,
  CreatePlansDto,
  UpdatePlansDto
> {
  @Inject(PLANS_PROVIDER) repository: BaseRepo<Plans>;
}
