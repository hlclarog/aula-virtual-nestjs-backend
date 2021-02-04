import { Inject, Injectable } from '@nestjs/common';
import {
  CreateActivityRelateElementsDto,
  UpdateActivityRelateElementsDto,
  ACTIVITY_RELATE_ELEMENTS_PROVIDER,
} from './activity_relate_elements.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ActivityRelateElements } from './activity_relate_elements.entity';

@Injectable()
export class ActivityRelateElementsService extends BaseService<
  ActivityRelateElements,
  CreateActivityRelateElementsDto,
  UpdateActivityRelateElementsDto
> {
  @Inject(ACTIVITY_RELATE_ELEMENTS_PROVIDER)
  repository: BaseRepo<ActivityRelateElements>;
}
