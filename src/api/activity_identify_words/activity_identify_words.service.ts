import { Inject, Injectable } from '@nestjs/common';
import {
  CreateActivityIdentifyWordsDto,
  UpdateActivityIdentifyWordsDto,
  ACTIVITY_IDENTIFY_WORDS_PROVIDER,
} from './activity_identify_words.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ActivityIdentifyWords } from './activity_identify_words.entity';

@Injectable()
export class ActivityIdentifyWordsService extends BaseService<
  ActivityIdentifyWords,
  CreateActivityIdentifyWordsDto,
  UpdateActivityIdentifyWordsDto
> {
  @Inject(ACTIVITY_IDENTIFY_WORDS_PROVIDER)
  repository: BaseRepo<ActivityIdentifyWords>;
}
