import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import {
  COURSE_LESSONS_PROVIDER,
  CreateCourseLessonsDto,
  UpdateCourseLessonsDto,
} from './course_lessons.dto';
import { CourseLessons } from './course_lessons.entity';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class CourseLessonsService extends BaseService<
  CourseLessons,
  CreateCourseLessonsDto,
  UpdateCourseLessonsDto
> {
  @Inject(COURSE_LESSONS_PROVIDER) repository: BaseRepo<CourseLessons>;

  async findByCourse(id: number): Promise<CourseLessons[]> {
    return await this.repository.find({
      where: { course_id: id },
    });
  }

  async changeOrder(data: {
    course_id: number;
    unit_id: number;
    new_order: number;
  }): Promise<any> {
    const listCourseLessons: CourseLessons[] = await this.repository
      .createQueryBuilder('course_lessons')
      .where(
        'course_lessons.id != :unit_id AND course_lessons.course_id = :course_id',
        {
          unit_id: data.unit_id,
          course_id: data.course_id,
        },
      )
      .orderBy('course_lessons.order', 'ASC')
      .getMany();

    let order = 0;
    for (const f of listCourseLessons) {
      order += data.new_order == order + 1 ? 2 : 1;
      await this.repository
        .createQueryBuilder()
        .update()
        .set({ order: order })
        .where('id = :unit_id', {
          unit_id: f.id,
        })
        .execute();
    }

    return await this.repository
      .createQueryBuilder()
      .update()
      .set({ order: data.new_order })
      .where('id = :unit_id', {
        unit_id: data.unit_id,
      })
      .execute();
  }
}
