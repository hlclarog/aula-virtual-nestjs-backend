import { Inject, Injectable } from '@nestjs/common';
import {
  CreateLessonScormResourcesDto,
  UpdateLessonScormResourcesDto,
  LESSON_SCORM_RESOURCES_PROVIDER,
} from './lesson_scorm_resources.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { LessonScormResources } from './lesson_scorm_resources.entity';

@Injectable()
export class LessonScormResourcesService extends BaseService<
  LessonScormResources,
  CreateLessonScormResourcesDto,
  UpdateLessonScormResourcesDto
> {
  @Inject(LESSON_SCORM_RESOURCES_PROVIDER)
  repository: BaseRepo<LessonScormResources>;
}
