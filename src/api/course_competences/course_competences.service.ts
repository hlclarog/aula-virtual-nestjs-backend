import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import {
  COURSE_COMPETENCES_PROVIDER,
  CreateCourseCompetencesDto,
  UpdateCourseCompetencesDto,
} from './course_competences.dto';
import { CourseCompetences } from './course_competences.entity';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class CourseCompetencesService extends BaseService<
  CourseCompetences,
  CreateCourseCompetencesDto,
  UpdateCourseCompetencesDto
> {
  @Inject(COURSE_COMPETENCES_PROVIDER) repository: BaseRepo<CourseCompetences>;
}
