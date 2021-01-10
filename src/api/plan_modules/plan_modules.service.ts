import { Inject, Injectable } from '@nestjs/common';
import {
  CreatePlanModulesDto,
  UpdatePlanModulesDto,
  PLAN_MODULES_PROVIDER,
} from './plan_modules.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { PlanModules } from './plan_modules.entity';

@Injectable()
export class PlanModulesService extends BaseService<
  PlanModules,
  CreatePlanModulesDto,
  UpdatePlanModulesDto
> {
  @Inject(PLAN_MODULES_PROVIDER) repository: BaseRepo<PlanModules>;
}
