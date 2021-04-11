import { Inject, Injectable } from '@nestjs/common';
import {
  CreateLessonPermissionTypesDto,
  UpdateLessonPermissionTypesDto,
  LESSON_PERMISSION_TYPES_PROVIDER,
} from './lesson_permission_types.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { LessonPermissionTypes } from './lesson_permission_types.entity';

@Injectable()
export class LessonPermissionTypesService extends BaseService<
  LessonPermissionTypes,
  CreateLessonPermissionTypesDto,
  UpdateLessonPermissionTypesDto
> {
  @Inject(LESSON_PERMISSION_TYPES_PROVIDER)
  repository: BaseRepo<LessonPermissionTypes>;
}
