import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import { CourseUsers } from './course-users.entity';
import { BaseRepo } from '../../base/base.repository';
import {
  COURSE_USERS_PROVIDER,
  CreateCourseUsersDto,
  EnrollmentCourseUsersDto,
  GetProgressStudentsDto,
  UpdateCourseUsersDto,
} from './course-users.dto';
import {
  SubscribeCourseStudentDto,
  UnSubscribeCourseStudentDto,
} from '../courses/courses.dto';
import { LessonsService } from '../lessons/lessons.service';
import { TypesReasonsPoints } from '../points_user_log/points_user_log.dto';
import { PointsUserLogService } from '../points_user_log/points_user_log.service';
import {
  INFO_TENANCY_PROVIDER,
  InfoTenancyDomain,
} from './../../utils/providers/info-tenancy.module';
import { TenancyConfigService } from '../tenancy_config/tenancy_config.service';
import { ActivityTryUsersService } from '../activity_try_users/activity_try_users.service';
import { LessonScormIntentsService } from '../lesson_scorm_intents/lesson_scorm_intents.service';
import { LessonTryUsersService } from '../lesson_try_users/lesson_try_users.service';
import { ProgramCourses } from '../program_courses/program_courses.entity';
import { ENROLLMENT_STATUS_ENUM } from '../enrollment-status/enrollment-status.dto';
import { PROGRAM_USER_COURSE_PROVIDER } from '../program_user_course/program_user_course.dto';
import { ProgramUserCourse } from '../program_user_course/program_user_course.entity';
import { PROGRAM_COURSES_PROVIDER } from '../program_courses/program_courses.dto';
import { ProgramUserCourseService } from '../program_user_course/program_user_course.service';
import { TypesLesson } from '../lesson_types/lesson_types.dto';
import { AwsService } from './../../aws/aws.service';
import { durationFilesUrl } from './../../aws/aws.dto';
import {
  USER_SUBSCRIBE_COURSE,
  USER_SUBSCRIBE_COURSE_ID,
} from '../email_activities/email_activities_actions.dto';
import { EmailManagerService } from './../../email/email-manager.service';

@Injectable()
export class CourseUsersService extends BaseService<
  CourseUsers,
  CreateCourseUsersDto,
  UpdateCourseUsersDto
> {
  @Inject(COURSE_USERS_PROVIDER) repository: BaseRepo<CourseUsers>;
  @Inject(PROGRAM_COURSES_PROVIDER) programCourses: BaseRepo<ProgramCourses>;
  @Inject(PROGRAM_USER_COURSE_PROVIDER)
  programUserCourse: BaseRepo<ProgramUserCourse>;
  constructor(
    @Inject(INFO_TENANCY_PROVIDER) private tenancy: InfoTenancyDomain,
    private tenancyConfigService: TenancyConfigService,
    private lessonsService: LessonsService,
    private pointsUserLogService: PointsUserLogService,
    private activityTryUsersService: ActivityTryUsersService,
    private lessonScormIntentsService: LessonScormIntentsService,
    private lessonTryUsersService: LessonTryUsersService,
    private readonly programUserCourseService: ProgramUserCourseService,
    private awsService: AwsService,
    private emailService: EmailManagerService,
  ) {
    super();
  }

  async findByCourse(id: number): Promise<CourseUsers[]> {
    const result = await this.repository
      .createQueryBuilder('course_user')
      .select([
        'course_user.course_id',
        'course_user.user_id',
        'course_user.enrollment_status_id',
        'course_user.enrollment_type_id',
        'course_user.begin_date',
        'course_user.end_date',
        'course_user.certificate_file',
        'course_user.certificate_code_validation',
        'course_user.favorite',
        'course_user.score',
        'course_user.downloaded',
        'course_user.active',
        'user.id',
        'user.name',
        'user.lastname',
        'user.last_login',
      ])
      .leftJoin('course_user.user', 'user')
      .where('course_user.course_id = :id', { id })
      .getMany();
    for (let i = 0; i < result.length; i++) {
      const element = result[i];
      const dataprogress = await this.lessonsService.findProgessByCourse(
        [id],
        element.user_id,
      );
      const infoProgress = dataprogress.length > 0 ? dataprogress[0] : {};
      element['progress'] = infoProgress['progress'];
    }
    return result;
  }

  async set(createDto: CreateCourseUsersDto): Promise<any> {
    const founds = await this.repository
      .createQueryBuilder()
      .where('user_id = :user AND course_id = :course', {
        user: `${createDto.user_id}`,
        course: `${createDto.course_id}`,
      })
      .withDeleted()
      .getCount();
    let result;
    if (founds) {
      result = await this.repository
        .createQueryBuilder()
        .update()
        .set({ deleted_at: null })
        .where(
          'user_id = :user AND course_id = :course AND deleted_at is not null',
          {
            user_id: createDto.user_id,
            course_id: createDto.course_id,
          },
        )
        .execute();
    } else {
      result = await this.repository
        .createQueryBuilder()
        .insert()
        .into(CourseUsers)
        .values(createDto)
        .execute();
    }

    return { data: result };
  }

  async subscribe(createDto: SubscribeCourseStudentDto) {
    const match = await this.repository.findOne({
      where: { course_id: createDto.course_id, user_id: createDto.user_id },
      withDeleted: true,
    });
    if (!match) {
      await this.pointsUserLogService.generatePoints(
        createDto.user_id,
        TypesReasonsPoints.COURSE_INIT,
        createDto.course_id,
      );
      const course_user_new = await this.repository.save(createDto);
      try {
        const course_user = await this.repository
          .createQueryBuilder('course_user')
          .select([
            'course_user.user_id',
            'course_user.course_id',
            'user.name',
            'user.lastname',
            'course.name',
          ])
          .leftJoin('course_user.user', 'user')
          .leftJoin('course_user.course', 'course')
          .where('course_user.id = :id', { id: course_user_new.id })
          .getOne();
        const dataEmail: USER_SUBSCRIBE_COURSE = {
          STUDENT_NAME: `${
            course_user.user.name ? course_user.user.name : ''
          } ${course_user.user.lastname ? course_user.user.lastname : ''}`,
          COURSE_NAME: `${course_user.course.name}`,
        };
        await this.emailService.sendEmailFromActivity({
          user_id: createDto.user_id,
          email_activity_id: USER_SUBSCRIBE_COURSE_ID,
          alias: this.tenancy.alias,
          data: dataEmail,
        });
      } catch (error) {}
      return course_user_new;
    } else {
      return await this.repository.update(match.id, {
        deleted_at: null,
        end_date: null,
      });
    }
  }

  async setFavorite(user_id: number, course_id: number, favorite: boolean) {
    return await this.repository.update(
      { course_id, user_id },
      {
        favorite,
      },
    );
  }

  async setScore(user_id: number, course_id: number, score: number) {
    return await this.repository.update(
      { course_id, user_id },
      {
        score,
      },
    );
  }

  async unSubscribe(data: UnSubscribeCourseStudentDto) {
    const config = await this.tenancyConfigService.findOne(this.tenancy.id);
    await this.repository.update(
      {
        course_id: data.course_id,
        user_id: data.user_id,
      },
      { end_date: data.end_date },
    );
    if (config.unenroll_reset) {
      await this.activityTryUsersService.resetProgressUser(
        data.user_id,
        data.course_id,
      );
      await this.lessonScormIntentsService.resetProgressUser(
        data.user_id,
        data.course_id,
      );
      await this.lessonTryUsersService.resetProgressUser(
        data.user_id,
        data.course_id,
      );
      await this.repository.delete({
        course_id: data.course_id,
        user_id: data.user_id,
      });
    } else {
      await this.repository.softDelete({
        user_id: data.user_id,
        course_id: data.course_id,
      });
    }

    return { unroll: true };
  }

  async addEnrollment(courseUsersDto: EnrollmentCourseUsersDto) {
    const availableCredits = await this.programUserCourseService.availableCredits(
      {
        program_id: courseUsersDto.program_id,
        user_id: courseUsersDto.user_id,
      },
    );
    if (availableCredits > 0) {
      const courseUser: CreateCourseUsersDto = {
        course_id: courseUsersDto.course_id,
        user_id: courseUsersDto.user_id,
        enrollment_status_id: ENROLLMENT_STATUS_ENUM.REGISTERED,
      };

      const courseUsersFound = await this.repository
        .createQueryBuilder()
        .where('user_id = :user_id AND course_id = :course_id', {
          user_id: courseUsersDto.user_id,
          course_id: courseUsersDto.course_id,
        })
        .withDeleted()
        .getCount();
      if (courseUsersFound) {
        await this.repository
          .createQueryBuilder()
          .update()
          .set({ deleted_at: null })
          .where('user_id = :user_id AND course_id = :course_id', {
            user_id: courseUsersDto.user_id,
            course_id: courseUsersDto.course_id,
          })
          .execute();
      } else {
        await this.repository
          .createQueryBuilder()
          .insert()
          .into(CourseUsers)
          .values(courseUser)
          .execute();
      }

      const courseUserSave = await this.repository
        .createQueryBuilder()
        .where('user_id = :user_id AND course_id = :course_id', {
          user_id: courseUsersDto.user_id,
          course_id: courseUsersDto.course_id,
        })
        .getOne();

      const programCoursesResult = await this.programCourses
        .createQueryBuilder('program_courses')
        .select(['program_courses.credits'])
        .where(
          'program_courses.course_id = :course_id AND program_courses.program_id = :program_id',
          {
            course_id: courseUsersDto.course_id,
            program_id: courseUsersDto.program_id,
          },
        )
        .getOne();

      const programUserCourseFound = await this.programUserCourse
        .createQueryBuilder()
        .where(
          'program_user_id = :program_user_id AND course_user_id = :course_user_id',
          {
            program_user_id: courseUsersDto.program_user_id,
            course_user_id: courseUserSave.id,
          },
        )
        .withDeleted()
        .getCount();
      if (!programUserCourseFound) {
        const programUserCourseData: Partial<ProgramUserCourse> = {
          program_user_id: courseUsersDto.program_user_id,
          course_user_id: courseUserSave.id,
          credits: programCoursesResult.credits,
        };
        return await this.programUserCourse.save(programUserCourseData);
      }
    } else {
      throw new ForbiddenException({
        message: 'You have no credits available',
      });
    }
  }

  async progressAllStudentByCourse(data: GetProgressStudentsDto) {
    const result = await this.repository
      .createQueryBuilder('course_user')
      .select([
        'course_user.course_id',
        'course_user.user_id',
        'course_user.begin_date',
        'course_user.end_date',
        'course_user.score',
        'course_user.active',
        'user.id',
        'user.name',
        'user.lastname',
        'user.last_login',
      ])
      .leftJoin('course_user.user', 'user')
      .where(
        ` course_user.course_id = :id and 
          course_user.begin_date BETWEEN COALESCE(:begin, course_user.begin_date) AND COALESCE(:end, course_user.begin_date)
        `,
        { id: data.course_id, begin: data.begin_date, end: data.end_date },
      )
      .getMany();
    for (let i = 0; i < result.length; i++) {
      const element = result[i];
      const dataprogress = await this.lessonsService.findProgessByCourse(
        [data.course_id],
        element.user_id,
      );
      const lessons = [];
      const lessons_progress = {};
      let progress = 0;
      if (dataprogress.length > 0) {
        progress = dataprogress[0]['progress'];
        for (let j = 0; j < dataprogress[0].course_units.length; j++) {
          const unit = dataprogress[0].course_units[j];
          for (let k = 0; k < unit.course_lessons.length; k++) {
            const course_lesson = unit.course_lessons[k];
            if (
              course_lesson.lesson.lesson_type_id == TypesLesson.QUIZ ||
              course_lesson.lesson.lesson_type_id == TypesLesson.DELIVERABLE
            ) {
              lessons_progress[course_lesson.lesson.name] =
                course_lesson['progress_lesson'];
              lessons.push({
                type: course_lesson.lesson.lesson_type.description,
                name: course_lesson.lesson.name,
                progress: course_lesson['progress_lesson'],
              });
            }
          }
        }
      }
      element['progress'] = progress;
      element['lessons_progress'] = lessons_progress;
      element['lessons'] = lessons;
    }
    return result;
  }

  async setCertficate(
    user_id: number,
    course_id: number,
    certificate_id: number,
  ) {
    return await this.repository.update(
      { user_id, course_id },
      { certificate_id },
    );
  }

  async rankingStudents(course_id: number) {
    const result = await this.repository
      .createQueryBuilder('course_user')
      .select([
        'course_user.id',
        'user.id',
        'user.identification',
        'user.name',
        'user.lastname',
        'user.points',
        'user.picture',
        'user.email',
      ])
      .leftJoin('course_user.user', 'user')
      .where('course_user.course_id = :course_id', { course_id })
      .orderBy('user.points', 'DESC')
      .limit(10)
      .getMany();
    for (let i = 0; i < result.length; i++) {
      const user = result[i].user;
      if (user.picture) {
        user.picture = await this.awsService.getFile(
          user.picture,
          durationFilesUrl.img_user,
        );
      }
    }
    return result;
  }
}
