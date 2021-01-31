import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import {
  COURSE_UNITS_PROVIDER,
  CreateCourseUnitsDto,
  UpdateCourseUnitsDto,
} from './course_units.dto';
import { CourseUnits } from './course_units.entity';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class CourseUnitsService extends BaseService<
  CourseUnits,
  CreateCourseUnitsDto,
  UpdateCourseUnitsDto
> {
  @Inject(COURSE_UNITS_PROVIDER) repository: BaseRepo<CourseUnits>;

  async findByCourse(id: number): Promise<CourseUnits[]> {
    return await this.repository.find({
      where: { course: id },
    });
  }

  async changeOrder(data: {
    course_id: number;
    unit_id: number;
    new_order: number;
  }): Promise<any> {
    const listCourseUnits: CourseUnits[] = await this.repository
      .createQueryBuilder('course_units')
      .where(
        'course_units.id != :unit_id AND course_units.course_id = :course_id AND course_units.order >= :new_order',
        {
          unit_id: data.unit_id,
          course_id: data.course_id,
          new_order: data.new_order,
        },
      )
      .orderBy('course_units.order', 'ASC')
      .getMany();

    let order = data.new_order;
    for (const f of listCourseUnits) {
      order += 1;
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
