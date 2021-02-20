import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import { CourseInterestAreas } from './course_interest_areas.entity';
import { BaseRepo } from '../../base/base.repository';
import {
  CreateCourseInterestAreasDto,
  COURSE_INTEREST_AREAS_PROVIDER,
  UpdateCourseInterestAreasDto,
} from './course_interest_areas.dto';

@Injectable()
export class CourseInterestAreasService extends BaseService<
  CourseInterestAreas,
  CreateCourseInterestAreasDto,
  UpdateCourseInterestAreasDto
> {
  @Inject(COURSE_INTEREST_AREAS_PROVIDER)
  repository: BaseRepo<CourseInterestAreas>;

  async findByCourse(id: number): Promise<CourseInterestAreas[]> {
    return await this.repository.find({
      where: { course_id: id },
    });
  }

  async findGroup(id_user: number, type_user: string): Promise<any[]> {
    switch (type_user) {
      case 'teacher':
        return await this.repository
          .createQueryBuilder('course_interest_areas')
          .leftJoinAndSelect('course_interest_areas.courses', 'course')
          .where('course.user_id = :id_user', { id_user })
          .getMany();
        break;
      default:
        return [];
        break;
    }
  }

  async set(idCourse: number, areas: Array<number>): Promise<any> {
    const areasList = areas.length > 0 ? areas.join() : [0].join();
    // DELETE ITEMS NOT RECEIVED
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(CourseInterestAreas)
      .where(
        `course_id = :idCourse and interest_area_id not in (${areasList})`,
        {
          idCourse,
        },
      )
      .execute();
    // SEARCH ITEMS ACTUALS FOR NO DUPLICATE
    const founds = await this.repository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.interest_area', 'interest_area')
      .where(
        `item.course_id = :idCourse and item.interest_area_id in (${areasList})`,
        {
          idCourse,
        },
      )
      .getMany();
    // SAVE ITEMS NEWS
    const values: any[] = areas.map((idArea) => {
      return { course_id: idCourse, interest_area_id: idArea };
    });
    await this.repository
      .createQueryBuilder()
      .insert()
      .into(CourseInterestAreas)
      .values(
        values.filter((v) =>
          founds
            .map((f: any) => f.interest_area.id)
            .indexOf(v.interest_area_id) >= 0
            ? false
            : true,
        ),
      )
      .execute();
    return { update: true };
  }
}
