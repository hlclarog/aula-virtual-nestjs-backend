import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import {
  CopyLessonsDto,
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
import { LessonDetailsService } from '../lesson_details/lesson_details.service';
import { EnumActivityType } from '../lesson_activities/lesson_activities.service';
import { LessonActivities } from '../lesson_activities/lesson_activities.entity';
import { LessonDetails } from '../lesson_details/lesson_details.entity';
import { TypesLesson } from '../lesson_types/lesson_types.dto';
import { LessonScorms } from '../lesson_scorms/lesson_scorms.entity';
import { LessonScormResources } from '../lesson_scorm_resources/lesson_scorm_resources.entity';
import { LessonScormResourcesService } from '../lesson_scorm_resources/lesson_scorm_resources.service';
import { ActivityMultipleOptionsService } from '../activity_multiple_options/activity_multiple_options.service';
import { ActivityMultipleOptions } from '../activity_multiple_options/activity_multiple_options.entity';
import { MultipleOptionAnswersService } from '../multiple_option_answers/multiple_option_answers.service';
import { MultipleOptionAnswers } from '../multiple_option_answers/multiple_option_answers.entity';
import { ActivitySortItemsService } from '../activity_sort_items/activity_sort_items.service';
import { SortItemAnswersService } from '../sort_item_answers/sort_item_answers.service';
import { ActivityRelateElementsService } from '../activity_relate_elements/activity_relate_elements.service';
import { RelateElementAnswersService } from '../relate_element_answers/relate_element_answers.service';
import { ActivityIdentifyWordsService } from '../activity_identify_words/activity_identify_words.service';
import { ActivityCompleteTextsService } from '../activity_complete_texts/activity_complete_texts.service';
import { ActivitySortItems } from '../activity_sort_items/activity_sort_items.entity';
import { SortItemAnswers } from '../sort_item_answers/sort_item_answers.entity';
import { ActivityRelateElements } from '../activity_relate_elements/activity_relate_elements.entity';
import { RelateElementAnswers } from '../relate_element_answers/relate_element_answers.entity';
import { ActivityIdentifyWords } from '../activity_identify_words/activity_identify_words.entity';
import { ActivityCompleteTexts } from '../activity_complete_texts/activity_complete_texts.entity';
import { LESSON_SCORMS_PROVIDER } from '../lesson_scorms/lesson_scorms.dto';
import { LESSON_SCORM_RESOURCES_PROVIDER } from '../lesson_scorm_resources/lesson_scorm_resources.dto';
import { LESSON_ACTIVITIES_PROVIDER } from '../lesson_activities/lesson_activities.dto';
import { CourseLessonsService } from '../course_lessons/course_lessons.service';
import { TypesLessonPermissions } from '../lesson_permission_types/lesson_permission_types.dto';
import { UsersOrganizationsService } from '../users_organizations/users_organizations.service';
import { COURSE_LESSONS_PROVIDER, UpdateCourseLessonsDto } from '../course_lessons/course_lessons.dto';
import { CourseLessons } from '../course_lessons/course_lessons.entity';

@Injectable()
export class LessonsService extends BaseService<
  Lessons,
  CreateLessonsDto,
  UpdateLessonsDto
> {
  @Inject(COURSE_UNITS_PROVIDER) repository: BaseRepo<Lessons>;
  @Inject(COURSES_PROVIDER) repositoryCourses: BaseRepo<Courses>;
  @Inject(LESSON_SCORMS_PROVIDER) repositoryScorms: BaseRepo<LessonScorms>;
  @Inject(LESSON_SCORM_RESOURCES_PROVIDER)
  repositoryScormsResources: BaseRepo<LessonScormResources>;
  @Inject(LESSON_ACTIVITIES_PROVIDER)
  repositoryLessonActivity: BaseRepo<LessonActivities>;
  @Inject(COURSE_LESSONS_PROVIDER)
  repositoryCourseLessons: BaseRepo<CourseLessons>;

  constructor(
    private awsService: AwsService,
    private lessonTryUsersService: LessonTryUsersService,
    private lessonDetailsService: LessonDetailsService,
    private lessonScormResourcesService: LessonScormResourcesService,
    private activityMultipleOptionsService: ActivityMultipleOptionsService,
    private multipleOptionAnswersService: MultipleOptionAnswersService,
    private activitySortItemsService: ActivitySortItemsService,
    private sortItemAnswersService: SortItemAnswersService,
    private activityRelateElementsService: ActivityRelateElementsService,
    private relateElementAnswersService: RelateElementAnswersService,
    private activityIdentifyWordsService: ActivityIdentifyWordsService,
    private activityCompleteTextsService: ActivityCompleteTextsService,
    private courseLessonsService: CourseLessonsService,
    private usersOrganizationsService: UsersOrganizationsService,
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
    course_lesson_id: number,
    user_id: number,
  ): Promise<Lessons> {
    const lesson: any = await this.repository
      .createQueryBuilder('lesson')
      .select([
        'course_lesson.id',
        'course_lesson.course_id',
        'course_lesson.lesson_id',
        'lesson.id',
        'lesson.active',
        'lesson.lesson_type_id',
        'lesson.lesson_permission_type_id',
        'lesson.user_id',
        'lesson.name',
        'lesson.description',
        'lesson.video_url',
        'lesson.content',
        'lesson.min_progress',
        'lesson.duration',
        'lesson.suggested_weeks',
        'lesson.visible',
        'lesson.max_due_date',
        'lesson.delivery_late',
        'lesson.date_type_id',
      ])
      .innerJoin('lesson.course_lessons', 'course_lesson')
      .where('course_lesson.id = :course_lesson_id', { course_lesson_id })
      .getOneOrFail();
    if (lesson.video_url) {
      lesson.video_url = await this.awsService.getFile(lesson.video_url);
    }
    const intent = await this.lessonTryUsersService.getActualTry(
      user_id,
      course_lesson_id,
    );
    lesson.intent = intent;
    return lesson;
  }

  async create(createDto: CreateLessonsDto) {
    const data: any = Object.assign({}, createDto);
    if (createDto.video_url) {
      data.video_url = await this.setVideo(createDto.video_url);
    }
    delete data.course_id;
    delete data.course_unit_id;
    delete data.order;
    const lesson = await this.repository.save(data);
    if (createDto.course_id && createDto.course_unit_id) {
      const course_lesson = await this.courseLessonsService.create({
        lesson_id: lesson.id,
        course_id: createDto.course_id,
        course_unit_id: createDto.course_unit_id,
        order: createDto.order,
      });
      lesson['course_lesson'] = course_lesson;
    }
    return lesson;
  }

  async update(id: number, updateDto: UpdateLessonsDto): Promise<any> {
    const data: any = Object.assign({}, updateDto);
    delete data.course_id;
    delete data.course_unit_id;
    delete data.course_lesson_id;
    delete data.order;
    if (updateDto.video_url) {
      data.video_url = await this.setVideo(updateDto.video_url);
    }
    const course_lesson: UpdateCourseLessonsDto = {
      course_id: updateDto.course_id,
      course_unit_id: updateDto.course_unit_id,
      lesson_id: id,
    };
    await this.courseLessonsService.updateRow(
      updateDto.course_lesson_id.toString(),
      course_lesson,
    );
    const result = await this.repository.update(id, data);
    if (result?.affected > 0) {
      return this.repository
        .createQueryBuilder('lesson')
        .select([
          'course_lesson.id',
          'course_lesson.course_id',
          'course_lesson.lesson_id',
          'lesson.id',
          'lesson.active',
          'lesson.lesson_type_id',
          'lesson.lesson_permission_type_id',
          'lesson.user_id',
          'lesson.name',
          'lesson.description',
          'lesson.video_url',
          'lesson.content',
          'lesson.min_progress',
          'lesson.duration',
          'lesson.suggested_weeks',
          'lesson.visible',
          'lesson.max_due_date',
          'lesson.delivery_late',
          'lesson.date_type_id',
        ])
        .innerJoin('lesson.course_lessons', 'course_lesson')
        .where('lesson.id=:id', { id: id })
        .getOne();
    }
    return result;
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
      .leftJoin('lesson.course_lessons', 'course_lesson')
      .where(`course_lesson.course_id = :course_id`, { course_id: id })
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
          'course_lesson.id',
          'course_lesson.course_id',
          'course_lesson.lesson_id',
          'course_lesson.order',
          'lesson.id',
          'lesson.name',
          'lesson.description',
          'lesson.min_progress',
          'lesson.duration',
          'lesson.max_due_date',
          'lesson.delivery_late',
          'lesson.date_type_id',
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
        .leftJoin('course_unit.course_lessons', 'course_lesson')
        .leftJoin('course_lesson.lesson', 'lesson')
        .leftJoin('lesson.lesson_type', 'lesson_type')
        .leftJoin(
          'course_lesson.lesson_try_users',
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
          coursesItem.course_lessons.forEach((course_lesson) => {
            const lesson = course_lesson.lesson;
            total_duration += lesson.duration ? lesson.duration : 0;
          });
        });
        for (let w = 0; w < course.course_units.length; w++) {
          const units = course.course_units[w];
          for (let e = 0; e < units.course_lessons.length; e++) {
            const element = units.course_lessons[e];
            element['part'] = element.lesson.duration / total_duration;
            element['progress_lesson'] = 0;
            element['progress_course'] = 0;
            switch (element.lesson.lesson_type_id) {
              case 1:
                if (element.lesson_try_users.length > 0) {
                  const progress_in_lesson =
                    element.lesson_try_users[0].percent;
                  const progress_in_course =
                    progress_in_lesson * element['part'];
                  element['progress_lesson'] = Math.round(progress_in_lesson);
                  element['progress_course'] = Math.round(progress_in_course);
                  progress_course += progress_in_course;
                }
                break;
              case 2:
                let activities_finalized = 0;
                for (
                  let j = 0;
                  j < element.lesson.lesson_activities.length;
                  j++
                ) {
                  const lesson_activity = element.lesson.lesson_activities[j];
                  if (lesson_activity.activity_try_users.length > 0) {
                    for (
                      let k = 0;
                      k < lesson_activity.activity_try_users.length;
                      k++
                    ) {
                      const lesson_tries =
                        lesson_activity.activity_try_users[k];
                      if (lesson_tries.activity_tries.length > 0) {
                        activities_finalized++;
                      }
                    }
                  }
                }
                const progress_in_lesson =
                  (activities_finalized /
                    element.lesson.lesson_activities.length) *
                  100;
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
          if (course_unit.course_lessons) {
            for (let k = 0; k < course_unit.course_lessons.length; k++) {
              const course_lesson = course_unit.course_lessons[k];
              if (course_lesson.lesson_id == lesson_id) {
                progress = course_lesson['progress_lesson'];
              }
            }
          }
        }
      }
    }
    return progress;
  }

  async searchLessonsForCoursesToCopy(name: string, user_id: number) {
    const organizations = (
      await this.usersOrganizationsService.findByUser(user_id)
    ).map((o) => o.organization_id);
    const organizationsList =
      organizations.length > 0 ? organizations.join() : [0].join();
    const courses: Courses[] =
      name.length > 4
        ? await this.repositoryCourses
            .createQueryBuilder('course')
            .select([
              'course.id',
              'course.name',
              'course.description',
              'course_unit.description',
              'course_unit.id',
              'course_unit.course_id',
              'course_lesson.lesson_id',
              'lesson.id',
              'lesson.name',
              'lesson.description',
              'lesson.lesson_permission_type_id',
            ])
            .leftJoin('course.course_units', 'course_unit')
            .leftJoin('course_unit.course_lessons', 'course_lesson')
            .leftJoin('course_lesson.lesson', 'lesson')
            .leftJoin('lesson.user', 'user')
            .leftJoin('user.users_organizations', 'users_organizations')
            .where(
              `
                LOWER(course.name) LIKE '%${name.toLowerCase()}%' 
                AND (
                  lesson.lesson_permission_type_id = ${
                    TypesLessonPermissions.PUBLIC
                  } OR (
                    lesson.lesson_permission_type_id = ${
                      TypesLessonPermissions.ORGANIZATION
                    } AND 
                    users_organizations.organization_id in (${organizationsList})
                  ) OR (
                    lesson.lesson_permission_type_id = ${
                      TypesLessonPermissions.PRIVATE
                    } AND 
                    lesson.user_id = :user_id
                  )
                )
              `,
              { user_id },
            )
            .getMany()
        : [];
    return courses;
  }

  async searchLessonsToCopy(name: string, user_id: number) {
    const organizations = (
      await this.usersOrganizationsService.findByUser(user_id)
    ).map((o) => o.organization_id);
    const organizationsList =
      organizations.length > 0 ? organizations.join() : [0].join();
    const lessons: Lessons[] =
      name.length > 4
        ? await this.repository
            .createQueryBuilder('lesson')
            .select([
              'lesson.id',
              'lesson.name',
              'lesson.description',
              'lesson.lesson_permission_type_id',
              'course_lesson.course_id',
              'course.id',
              'course.name',
              'course.description',
            ])
            .leftJoin('lesson.user', 'user')
            .leftJoin('user.users_organizations', 'users_organizations')
            .leftJoin('lesson.course_lessons', 'course_lesson')
            .leftJoin('course_lesson.course', 'course')
            .where(
              `
                LOWER(lesson.name) LIKE '%${name.toLowerCase()}%' 
                AND (
                  lesson.lesson_permission_type_id = ${
                    TypesLessonPermissions.PUBLIC
                  } OR (
                    lesson.lesson_permission_type_id = ${
                      TypesLessonPermissions.ORGANIZATION
                    } AND 
                    users_organizations.organization_id in (${organizationsList})
                  ) OR (
                    lesson.lesson_permission_type_id = ${
                      TypesLessonPermissions.PRIVATE
                    } AND 
                    lesson.user_id = :user_id
                  )
                )
              `,
              { user_id },
            )
            .getMany()
        : [];
    return lessons;
  }

  async copyLessons(data: CopyLessonsDto) {
    const lessons: Lessons[] = await this.repository
      .createQueryBuilder('lesson')
      .select([
        'lesson.id',
        'lesson.lesson_type_id',
        'lesson.lesson_permission_type_id',
        'lesson.user_id',
        'lesson.name',
        'lesson.description',
        'lesson.video_url',
        'lesson.content',
        'lesson.min_progress',
        'lesson.order',
        'lesson.duration',
        'lesson.suggested_weeks',
        'lesson.visible',
        'lesson.max_due_date',
        'lesson.delivery_late',
        'lesson.date_type_id',
        'lesson_detail.id',
        'lesson_detail.content_type_id',
        'lesson_detail.content',
        'lesson_detail.description',
        'lesson_detail.order',
        'lesson_activity.id',
        'lesson_activity.description',
        'lesson_activity.visible',
        'lesson_activity.detail_id',
        'lesson_activity.activity_type_id',
        'lesson_scorm.id',
        'lesson_scorm.content',
        'lesson_scorm.identifier',
        'lesson_scorm.title',
        'lesson_scorm_resource.id',
        'lesson_scorm_resource.index',
        'lesson_scorm_resource.identifier',
      ])
      .leftJoin('lesson.lesson_details', 'lesson_detail')
      .leftJoin('lesson.lesson_activities', 'lesson_activity')
      .leftJoin('lesson.lesson_scorms', 'lesson_scorm')
      .leftJoin('lesson_scorm.lesson_scorm_resources', 'lesson_scorm_resource')
      .where('lesson.id IN (:lessons_id)', {
        lessons_id: data.lessons_id.join(),
      })
      .getMany();

    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i];
      const lesson_new = await this.create({
        lesson_type_id: lesson.lesson_type_id,
        lesson_permission_type_id: lesson.lesson_permission_type_id,
        user_id: lesson.user_id,
        name: lesson.name,
        description: lesson.description,
        video_url: lesson.video_url,
        content: lesson.content,
        min_progress: lesson.min_progress,
        duration: lesson.duration,
        suggested_weeks: lesson.suggested_weeks,
        visible: lesson.visible,
      });
      const orderNew =
        (await this.courseLessonsService.findMaxOrderToUnit(
          data.course_unit_id,
        )) + 1;
      await this.courseLessonsService.create({
        lesson_id: lesson_new.id,
        course_id: data.course_id,
        course_unit_id: data.course_unit_id,
        order: orderNew,
      });
      lesson_new.lesson_details = [];
      lesson_new.lesson_activities = [];
      switch (lesson.lesson_type_id) {
        case TypesLesson.TEORIC || TypesLesson.FORUM:
          for (let j = 0; j < lesson.lesson_details.length; j++) {
            const lesson_detail = lesson.lesson_details[j];
            const lesson_detail_copy: LessonDetails = Object.assign(
              {},
              lesson_detail,
            );
            delete lesson_detail_copy.id;
            lesson_detail_copy.lesson_id = lesson_new.id;
            const lesson_detail_new = await this.lessonDetailsService.create(
              lesson_detail_copy,
            );
            lesson_new.lesson_details.push(lesson_detail_new);
          }
          break;
        case TypesLesson.PRACTICE || TypesLesson.QUIZ:
          for (let k = 0; k < lesson.lesson_activities.length; k++) {
            const lesson_activity = lesson.lesson_activities[k];
            const lesson_activity_copy: LessonActivities = Object.assign(
              {},
              lesson_activity,
            );
            switch (lesson_activity.activity_type_id) {
              case EnumActivityType.MultipleOptions:
                const activity_multiple: ActivityMultipleOptions = await this.activityMultipleOptionsService.getByDetailId(
                  lesson_activity.detail_id,
                );
                const activity_multiple_copy: ActivityMultipleOptions = Object.assign(
                  {},
                  activity_multiple,
                );
                delete activity_multiple_copy.id;
                delete activity_multiple_copy.multiple_option_answers;
                const activity_multiple_new = await this.activityMultipleOptionsService.create(
                  activity_multiple_copy,
                );
                activity_multiple_new.multiple_option_answers = [];
                for (
                  let q = 0;
                  q < activity_multiple.multiple_option_answers.length;
                  q++
                ) {
                  const answer = activity_multiple.multiple_option_answers[q];
                  const answer_copy: MultipleOptionAnswers = Object.assign(
                    {},
                    answer,
                  );
                  delete answer_copy.id;
                  answer_copy.activity_multiple_option_id =
                    activity_multiple_new.id;
                  const answer_new = await this.multipleOptionAnswersService.create(
                    answer_copy,
                  );
                  activity_multiple_new.multiple_option_answers.push(
                    answer_new,
                  );
                }
                lesson_activity_copy.detail_id = activity_multiple_new.id;
                break;
              case EnumActivityType.SortItems:
                const activity_sort: ActivitySortItems = await this.activitySortItemsService.getByDetailId(
                  lesson_activity.detail_id,
                );
                const activity_sort_copy: ActivitySortItems = Object.assign(
                  {},
                  activity_sort,
                );
                delete activity_sort_copy.id;
                delete activity_sort_copy.sort_item_answers;
                const activity_sort_new = await this.activitySortItemsService.create(
                  activity_sort_copy,
                );
                activity_sort_new.sort_item_answers = [];
                for (
                  let q = 0;
                  q < activity_sort.sort_item_answers.length;
                  q++
                ) {
                  const answer = activity_sort.sort_item_answers[q];
                  const answer_copy: SortItemAnswers = Object.assign(
                    {},
                    answer,
                  );
                  delete answer_copy.id;
                  answer_copy.activity_sort_item_id = activity_sort_new.id;
                  const answer_new = await this.sortItemAnswersService.create(
                    answer_copy,
                  );
                  activity_sort_new.sort_item_answers.push(answer_new);
                }
                lesson_activity_copy.detail_id = activity_sort_new.id;
                break;
              case EnumActivityType.RelateElements:
                const activity_relate: ActivityRelateElements = await this.activityRelateElementsService.getByDetailId(
                  lesson_activity.detail_id,
                );
                const activity_relate_copy: ActivityRelateElements = Object.assign(
                  {},
                  activity_relate,
                );
                delete activity_relate_copy.id;
                delete activity_relate_copy.relate_element_answers;
                const activity_relate_new = await this.activityRelateElementsService.create(
                  activity_relate_copy,
                );
                activity_relate_new.relate_element_answers = [];
                for (
                  let q = 0;
                  q < activity_relate.relate_element_answers.length;
                  q++
                ) {
                  const answer = activity_relate.relate_element_answers[q];
                  const answer_copy: RelateElementAnswers = Object.assign(
                    {},
                    answer,
                  );
                  delete answer_copy.id;
                  answer_copy.activity_relate_element_id =
                    activity_relate_new.id;
                  const answer_new = await this.relateElementAnswersService.create(
                    answer_copy,
                  );
                  activity_relate_new.relate_element_answers.push(answer_new);
                }
                lesson_activity_copy.detail_id = activity_relate_new.id;
                break;
              case EnumActivityType.IdentifyWord:
                const activity_identify: ActivityIdentifyWords = await this.activityIdentifyWordsService.getByDetailId(
                  lesson_activity.detail_id,
                );
                const activity_identify_copy: ActivityIdentifyWords = Object.assign(
                  {},
                  activity_identify,
                );
                delete activity_identify_copy.id;
                const activity_identify_new = await this.activityIdentifyWordsService.create(
                  activity_identify_copy,
                );
                lesson_activity_copy.detail_id = activity_identify_new.id;
                break;
              case EnumActivityType.CompleteText:
                const activity_complete: ActivityCompleteTexts = await this.activityCompleteTextsService.getByDetailId(
                  lesson_activity.detail_id,
                );
                const activity_complete_copy: ActivityCompleteTexts = Object.assign(
                  {},
                  activity_complete,
                );
                delete activity_complete_copy.id;
                const activity_complete_new = await this.activityCompleteTextsService.create(
                  activity_complete_copy,
                );
                lesson_activity_copy.detail_id = activity_complete_new.id;
                break;
            }
            delete lesson_activity_copy.id;
            lesson_activity_copy.lesson_id = lesson_new.id;
            const lesson_activity_new = await this.repositoryLessonActivity.save(
              lesson_activity_copy,
            );
            lesson_new.lesson_activities.push(lesson_activity_new);
          }
          break;
        case TypesLesson.SCORM:
          for (let l = 0; l < lesson.lesson_scorms.length; l++) {
            const lesson_scorm = lesson.lesson_scorms[l];
            const lesson_scorm_copy: LessonScorms = Object.assign(
              {},
              lesson_scorm,
            );
            delete lesson_scorm_copy.id;
            delete lesson_scorm_copy.lesson_scorm_resources;
            lesson_scorm_copy.lesson_id = lesson_new.id;
            const lesson_scorm_new = await this.repositoryScorms.save(
              lesson_scorm_copy,
            );
            lesson_scorm_new.lesson_scorm_resources = [];
            for (
              let m = 0;
              m < lesson_scorm.lesson_scorm_resources.length;
              m++
            ) {
              const lesson_scorm_resource =
                lesson_scorm.lesson_scorm_resources[m];
              const lesson_scorm_resource_copy: LessonScormResources = Object.assign(
                {},
                lesson_scorm_resource,
              );
              delete lesson_scorm_resource_copy.id;
              lesson_scorm_resource_copy.lesson_scorm_id = lesson_scorm_new.id;
              const lesson_scorm_resource_new = await this.lessonScormResourcesService.create(
                lesson_scorm_resource_copy,
              );
              lesson_scorm_new.lesson_scorm_resources.push(
                lesson_scorm_resource_new,
              );
            }
            lesson_new.lesson_activities.push(lesson_scorm_new);
          }
          break;
      }
    }
    return { copy: true, data };
  }

  async reuseLessons(data: CopyLessonsDto) {
    let orderNew = await this.courseLessonsService.findMaxOrderToUnit(
      data.course_unit_id,
    );
    const reuses = [];
    for (let i = 0; i < data.lessons_id.length; i++) {
      const element = data.lessons_id[i];
      orderNew++;
      reuses.push({
        lesson_id: element,
        course_unit_id: data.course_unit_id,
        course_id: data.course_id,
        order: orderNew,
        active: true,
      });
    }
    if (reuses.length > 0) {
      await this.repositoryCourseLessons.save(reuses);
    }
    return { reuse: true, data };
  }
}
