import { Inject, Injectable } from '@nestjs/common';
import {
  CreateLessonScormDetailsDto,
  UpdateLessonScormDetailsDto,
  LESSON_SCORM_DETAILS_PROVIDER,
} from './lesson_scorm_details.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { LessonScormDetails } from './lesson_scorm_details.entity';

@Injectable()
export class LessonScormDetailsService extends BaseService<
  LessonScormDetails,
  CreateLessonScormDetailsDto,
  UpdateLessonScormDetailsDto
> {
  @Inject(LESSON_SCORM_DETAILS_PROVIDER)
  repository: BaseRepo<LessonScormDetails>;
}
