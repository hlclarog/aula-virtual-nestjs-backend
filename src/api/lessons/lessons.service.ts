import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import {
  COURSE_UNITS_PROVIDER,
  CreateLessonsDto,
  UpdateLessonsDto,
} from './lessons.dto';
import { Lessons } from './lessons.entity';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class LessonsService extends BaseService<
  Lessons,
  CreateLessonsDto,
  UpdateLessonsDto
> {
  @Inject(COURSE_UNITS_PROVIDER) repository: BaseRepo<Lessons>;

  async findByCourse(id: number): Promise<Lessons[]> {
    return await this.repository.find({
      where: { course: id },
    });
  }
}
