import { Inject, Injectable } from '@nestjs/common';
import {
  CreateLessonScormIntentsDto,
  UpdateLessonScormIntentsDto,
  LESSON_SCORM_INTENTS_PROVIDER,
} from './lesson_scorm_intents.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { LessonScormIntents } from './lesson_scorm_intents.entity';

@Injectable()
export class LessonScormIntentsService extends BaseService<
  LessonScormIntents,
  CreateLessonScormIntentsDto,
  UpdateLessonScormIntentsDto
> {
  @Inject(LESSON_SCORM_INTENTS_PROVIDER)
  repository: BaseRepo<LessonScormIntents>;
}
