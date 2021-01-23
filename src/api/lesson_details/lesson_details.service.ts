import { Inject, Injectable } from '@nestjs/common';
import {
  CreateLessonDetailsDto,
  UpdateLessonDetailsDto,
  LESSON_DETAILS_PROVIDER,
} from './lesson_details.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { LessonDetails } from './lesson_details.entity';

@Injectable()
export class LessonDetailsService extends BaseService<
  LessonDetails,
  CreateLessonDetailsDto,
  UpdateLessonDetailsDto
> {
  @Inject(LESSON_DETAILS_PROVIDER) repository: BaseRepo<LessonDetails>;
}
