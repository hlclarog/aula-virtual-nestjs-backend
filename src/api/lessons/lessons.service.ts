import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import {
  COURSE_UNITS_PROVIDER,
  CreateLessonsDto,
  UpdateLessonsDto,
} from './lessons.dto';
import { Lessons } from './lessons.entity';
import { BaseRepo } from '../../base/base.repository';
import { AwsService } from '../../aws/aws.service';
import { typeFilesAwsNames } from '../../aws/aws.dto';
import * as shortid from 'shortid';
import { UpdateResult } from 'typeorm';
import { LessonTryUsersService } from '../lesson_try_users/lesson_try_users.service';
import { COURSES_PROVIDER } from '../courses/courses.dto';
import { Courses } from '../courses/courses.entity';

@Injectable()
export class LessonsService extends BaseService<
  Lessons,
  CreateLessonsDto,
  UpdateLessonsDto
> {
  @Inject(COURSE_UNITS_PROVIDER) repository: BaseRepo<Lessons>;
  @Inject(COURSES_PROVIDER) repositoryCourses: BaseRepo<Courses>;

  constructor(
    private awsService: AwsService,
    private lessonTryUsersService: LessonTryUsersService,
  ) {
    super();
  }

  async findOne(id: number): Promise<Lessons> {
    const lesson = await this.repository.findOneOrFail(id);
    if (lesson.video_url) {
      lesson.video_url = await this.awsService.getFile(lesson.video_url);
    }
    return lesson;
  }

  async findLessonForStudent(
    lesson_id: number,
    user_id: number,
  ): Promise<Lessons> {
    const lesson: any = await this.repository.findOneOrFail(lesson_id);
    if (lesson.video_url) {
      lesson.video_url = await this.awsService.getFile(lesson.video_url);
    }
    const intent = await this.lessonTryUsersService.getActualTry(
      user_id,
      lesson_id,
    );
    lesson.intent = intent;
    return lesson;
  }

  async create(createDto: CreateLessonsDto) {
    const data: any = Object.assign({}, createDto);
    if (createDto.video_url) {
      data.video_url = await this.setVideo(createDto.video_url);
    }
    const listLessons = await this.repository
      .createQueryBuilder()
      .where('course_unit_id = :unit_id', {
        unit_id: createDto.course_unit_id,
      })
      .getCount();
    data.order = listLessons + 1;
    return await this.repository.save(data);
  }

  async update(id: number, updateDto: UpdateLessonsDto): Promise<UpdateResult> {
    const data: any = Object.assign({}, updateDto);
    if (updateDto.video_url) {
      data.video_url = await this.setVideo(updateDto.video_url);
    }
    return await this.repository.update(id, data);
  }

  async setVideo(file) {
    const result = await this.awsService.saveFile({
      file,
      name: shortid.generate(),
      type: typeFilesAwsNames.lesson_videos,
    });
    return result.Key;
  }

  async findByCourse(id: number): Promise<Lessons[]> {
    return await this.repository
      .createQueryBuilder('lesson')
      .leftJoin('lesson.course_unit', 'course_unit')
      .where(`course_unit.course_id = :course_id`, { course_id: id })
      .getMany();
  }

  async findProgessByCourse(
    courses_id: number[],
    user_id: number,
  ): Promise<Courses[]> {
    if (courses_id.length > 0) {
      const metadata = await this.repositoryCourses
        .createQueryBuilder('course')
        .select([
          'course.id',
          'course.name',
          'course.description',
          'course_unit.description',
          'course_unit.id',
          'course_unit.course_id',
          'lesson.id',
          'lesson.name',
          'lesson.description',
          'lesson.min_progress',
          'lesson.duration',
          'lesson.lesson_type_id',
          'lesson_type.id',
          'lesson_type.description',
          'lesson_try_user.percent',
          'lesson_activity.id',
          'lesson_activity.activity_type_id',
          'activity_try_user.id',
          'activity_try.id',
          'activity_try.passed',
          'activity_try.date',
        ])
        .leftJoin('course.course_units', 'course_unit')
        .leftJoin('course_unit.lessons', 'lesson')
        .leftJoin('lesson.lesson_type', 'lesson_type')
        .leftJoin(
          'lesson.lesson_try_users',
          'lesson_try_user',
          'lesson_try_user.user_id = :user_id',
          { user_id },
        )
        .leftJoin('lesson.lesson_activities', 'lesson_activity')
        .leftJoin(
          'lesson_activity.activity_try_users',
          'activity_try_user',
          'activity_try_user.user_id = :user_id',
          { user_id },
        )
        .leftJoin(
          'activity_try_user.activity_tries',
          'activity_try',
          'activity_try.passed = true',
        )
        .where(`course.id in (${courses_id.join()})`)
        .getMany();
      for (let q = 0; q < metadata.length; q++) {
        const course = metadata[q];
        let total_duration = 0;
        let progress_course = 0;
        course.course_units.forEach((coursesItem) => {
          coursesItem.lessons.forEach((lesson) => {
            total_duration += lesson.duration ? lesson.duration : 0;
          });
        });
        for (let w = 0; w < course.course_units.length; w++) {
          const units = course.course_units[w];
          for (let e = 0; e < units.lessons.length; e++) {
            const element = units.lessons[e];
            element['part'] = element.duration / total_duration;
            element['progress_lesson'] = 0;
            element['progress_course'] = 0;
            switch (element.lesson_type_id) {
              case 1:
                if (element.lesson_try_users.length > 0) {
                  const progress_in_lesson = element.lesson_try_users[0].percent;
                  const progress_in_course = progress_in_lesson * element['part'];
                  element['progress_lesson'] = Math.round(progress_in_lesson);
                  element['progress_course'] = Math.round(progress_in_course);
                  progress_course += progress_in_course;
                }
                break;
              case 2:
                let activities_finalized = 0;
                for (let j = 0; j < element.lesson_activities.length; j++) {
                  const lesson_activity = element.lesson_activities[j];
                  if (lesson_activity.activity_try_users.length > 0) {
                    for (
                      let k = 0;
                      k < lesson_activity.activity_try_users.length;
                      k++
                    ) {
                      const lesson_tries = lesson_activity.activity_try_users[k];
                      if (lesson_tries.activity_tries.length > 0) {
                        activities_finalized++;
                      }
                    }
                  }
                }
                const progress_in_lesson =
                  (activities_finalized / element.lesson_activities.length) * 100;
                const progress_in_course = progress_in_lesson * element['part'];
                element['progress_lesson'] = progress_in_lesson
                  ? Math.round(progress_in_lesson)
                  : 0;
                element['progress_course'] = progress_in_course
                  ? Math.round(progress_in_course)
                  : 0;
                progress_course += progress_in_course ? progress_in_course : 0;
                break;
            }
          }
        }
        course['duration'] = Math.round(total_duration);
        course['progress'] = Math.round(progress_course);
      }
      return metadata;
    } else {
      return [];
    }
  }

  async getProgressToLesson(dataprogress: Courses[], lesson_id: number) {
    let progress = 0;
    for (let i = 0; i < dataprogress.length; i++) {
      const course = dataprogress[i];
      if (course.course_units) {
        for (let j = 0; j < course.course_units.length; j++) {
          const course_unit = course.course_units[j];
          if (course_unit.lessons) {
            for (let k = 0; k < course_unit.lessons.length; k++) {
              const lesson = course_unit.lessons[k];
              if (lesson.id == lesson_id) {
                progress = lesson['progress_lesson'];
              }
            }
          }
        }
      }
    }
    return progress;
  }

  async changeOrder(data: {
    lesson_id: number;
    unit_id: number;
    new_order: number;
  }): Promise<any> {
    const listLessons: Lessons[] = await this.repository
      .createQueryBuilder('lessons')
      .where('lessons.id != :lesson_id AND lessons.course_unit_id = :unit_id', {
        lesson_id: data.lesson_id,
        unit_id: data.unit_id,
      })
      .orderBy('lessons.order', 'ASC')
      .getMany();

    let order = 0;
    for (const f of listLessons) {
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
      .set({ course_unit_id: data.unit_id, order: data.new_order })
      .where('id = :lesson_id', {
        lesson_id: data.lesson_id,
      })
      .execute();
  }
}
