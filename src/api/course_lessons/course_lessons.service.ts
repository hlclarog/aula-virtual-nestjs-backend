import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import {
  COURSE_LESSONS_PROVIDER,
  CreateCourseLessonsDto,
  UpdateCourseLessonsDto,
} from './course_lessons.dto';
import { CourseLessons } from './course_lessons.entity';
import { BaseRepo } from '../../base/base.repository';
import { AwsService } from './../../aws/aws.service';

@Injectable()
export class CourseLessonsService extends BaseService<
  CourseLessons,
  CreateCourseLessonsDto,
  UpdateCourseLessonsDto
> {
  @Inject(COURSE_LESSONS_PROVIDER) repository: BaseRepo<CourseLessons>;

  constructor(private awsService: AwsService) {
    super();
  }

  async findOne(id: number): Promise<CourseLessons> {
    const course_lesson = await this.repository
      .createQueryBuilder('course_lesson')
      .select([
        'course_lesson.id',
        'course_lesson.course_id',
        'course_lesson.lesson_id',
        'course_lesson.course_unit_id',
        'lesson.id',
        'lesson.user_id',
        'lesson.lesson_type_id',
        'lesson.lesson_permission_type_id',
        'lesson.name',
        'lesson.description',
        'lesson.video_url',
        'lesson.content',
        'lesson.min_progress',
        'lesson.duration',
        'lesson.suggested_weeks',
        'lesson.visible',
      ])
      .leftJoin('course_lesson.lesson', 'lesson')
      .where('course_lesson.id = :id', { id })
      .getOne();

    if (course_lesson.lesson.video_url) {
      course_lesson.lesson.video_url = await this.awsService.getFile(
        course_lesson.lesson.video_url,
      );
    }
    return course_lesson;
  }

  async findByCourse(id: number): Promise<CourseLessons[]> {
    return await this.repository.find({
      where: { course_id: id },
    });
  }

  async findMaxOrderToUnit(course_unit_id: number) {
    const result: any = await this.repository
      .createQueryBuilder('course_lesson')
      .select('coalesce(MAX(course_lesson.order),0)', 'order')
      .where('course_lesson.course_unit_id = :course_unit_id', {
        course_unit_id,
      })
      .getRawOne();
    const order = result.order ? Number(result.order) : 0;
    return order;
  }

  async changeOrder(data: {
    course_id: number;
    lesson_id: number;
    new_order: number;
  }): Promise<any> {
    const listCourseLessons: CourseLessons[] = await this.repository
      .createQueryBuilder('course_lessons')
      .where(
        'course_lessons.id != :lesson_id AND course_lessons.course_id = :course_id',
        {
          lesson_id: data.lesson_id,
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
        .where('id = :lesson_id', {
          lesson_id: f.id,
        })
        .execute();
    }

    return await this.repository
      .createQueryBuilder()
      .update()
      .set({ order: data.new_order })
      .where('id = :lesson_id', {
        lesson_id: data.lesson_id,
      })
      .execute();
  }

  async updateRow(
    id: string,
    courseLessonsDto: UpdateCourseLessonsDto,
  ): Promise<any> {
    return await this.repository.update(id, courseLessonsDto);
  }
}
