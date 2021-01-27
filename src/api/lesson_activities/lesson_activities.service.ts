import { Inject, Injectable } from '@nestjs/common';
import {
  CreateLessonActivitiesDto,
  LESSON_ACTIVITIES_PROVIDER,
  UpdateLessonActivitiesDto,
} from './lesson_activities.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { LessonActivities } from './lesson_activities.entity';

@Injectable()
export class LessonActivitiesService extends BaseService<
  LessonActivities,
  CreateLessonActivitiesDto,
  UpdateLessonActivitiesDto
> {
  @Inject(LESSON_ACTIVITIES_PROVIDER) repository: BaseRepo<LessonActivities>;
}
