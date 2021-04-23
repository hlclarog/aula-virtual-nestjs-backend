import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import { CourseTeachers } from './course_teachers.entity';
import { BaseRepo } from '../../base/base.repository';
import {
  COURSE_TEACHERS_PROVIDER,
  CreateCourseTeachersDto,
  UpdateCourseTeachersDto,
} from './course_teachers.dto';

@Injectable()
export class CourseTeachersService extends BaseService<
  CourseTeachers,
  CreateCourseTeachersDto,
  UpdateCourseTeachersDto
> {
  @Inject(COURSE_TEACHERS_PROVIDER) repository: BaseRepo<CourseTeachers>;
  constructor() {
    super();
  }

  async findByCourse(id: number): Promise<CourseTeachers[]> {
    const result = await this.repository
      .createQueryBuilder('course_teacher')
      .select([
        'course_teacher.course_id',
        'course_teacher.user_id',
        'user.id',
        'user.name',
        'user.lastname',
      ])
      .leftJoin('course_teacher.user', 'user')
      .where('course_teacher.course_id = :id', { id })
      .getMany();
    return result;
  }

  async set(course_id: number, users: Array<number>): Promise<any> {
    const usersList = users.length > 0 ? users.join() : [0].join();
    // DELETE ITEMS NOT RECEIVED
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(CourseTeachers)
      .where(`course_id = :course_id and user_id not in (${usersList})`, {
        course_id,
      })
      .execute();
    // SEARCH ITEMS ACTUALS FOR NO DUPLICATE
    const founds = await this.repository
      .createQueryBuilder('item')
      .where(`item.course_id = :course_id and item.user_id in (${usersList})`, {
        course_id,
      })
      .getMany();
    // SAVE ITEMS NEWS
    const values: any[] = users.map((user_id) => {
      return { course_id, user_id };
    });
    await this.repository
      .createQueryBuilder()
      .insert()
      .into(CourseTeachers)
      .values(
        values.filter((v) =>
          founds.map((f: any) => f.user_id).indexOf(v.user_id) >= 0
            ? false
            : true,
        ),
      )
      .execute();
    return { update: true };
  }
}
