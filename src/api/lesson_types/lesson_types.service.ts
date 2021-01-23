import { Inject, Injectable } from '@nestjs/common';
import {
  CreateLessonTypesDto,
  UpdateLessonTypesDto,
  LESSON_TYPES_PROVIDER,
} from './lesson_types.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { LessonTypes } from './lesson_types.entity';

@Injectable()
export class LessonTypesService extends BaseService<
  LessonTypes,
  CreateLessonTypesDto,
  UpdateLessonTypesDto
> {
  @Inject(LESSON_TYPES_PROVIDER) repository: BaseRepo<LessonTypes>;
}
