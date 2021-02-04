import { Inject, Injectable } from '@nestjs/common';
import {
  CreateActivityCompleteTextsDto,
  UpdateActivityCompleteTextsDto,
  ACTIVITY_COMPLETE_TEXTS_PROVIDER,
} from './activity_complete_texts.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ActivityCompleteTexts } from './activity_complete_texts.entity';

@Injectable()
export class ActivityCompleteTextsService extends BaseService<
  ActivityCompleteTexts,
  CreateActivityCompleteTextsDto,
  UpdateActivityCompleteTextsDto
> {
  @Inject(ACTIVITY_COMPLETE_TEXTS_PROVIDER)
  repository: BaseRepo<ActivityCompleteTexts>;
}
