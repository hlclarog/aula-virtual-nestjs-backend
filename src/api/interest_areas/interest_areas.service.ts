import { Inject, Injectable } from '@nestjs/common';
import {
  CreateInterestAreasDto,
  UpdateInterestAreasDto,
  INTEREST_AREAS_PROVIDER,
} from './interest_areas.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { InterestAreas } from './interest_areas.entity';

@Injectable()
export class InterestAreasService extends BaseService<
  InterestAreas,
  CreateInterestAreasDto,
  UpdateInterestAreasDto
> {
  @Inject(INTEREST_AREAS_PROVIDER) repository: BaseRepo<InterestAreas>;
}
