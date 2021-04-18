import { Inject, Injectable } from '@nestjs/common';
import {
  CreateInterestAreasDto,
  UpdateInterestAreasDto,
  INTEREST_AREAS_PROVIDER,
} from './interest_areas.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { InterestAreas } from './interest_areas.entity';
import { AwsService } from '../../aws/aws.service';
import { CoursesService } from '../courses/courses.service';
import { timeConvert } from '../../utils/helper';
import { LessonsService } from '../lessons/lessons.service';
import { AST } from 'eslint';
import Program = AST.Program;
import { Programs } from '../programs/programs.entity';

@Injectable()
export class InterestAreasService extends BaseService<
  InterestAreas,
  CreateInterestAreasDto,
  UpdateInterestAreasDto
  > {
  constructor(
    private awsService: AwsService,
    private coursesService: CoursesService,
    private lessonsService: LessonsService,
  ) {
    super();
  }
  @Inject(INTEREST_AREAS_PROVIDER) repository: BaseRepo<InterestAreas>;

  async findGroup(user_id: number, type_user: string): Promise<any[]> {
    let list: InterestAreas[] = [];
    switch (type_user) {
      case 'all':
        list = await this.repository
          .createQueryBuilder('interest_areas')
          .select([
            'interest_areas.id',
            'interest_areas.description',
            'course_interest_area.course_id',
            'course.id',
            'course.name',
            'course.code',
            'course.description',
            'course.picture',
            'course.short_name',
            'course.free',
            'course.user_id',
            'user.id',
            'user.name',
            'course_user',
            'course_user.user',
            'student.id',
            'student.name',
            'fee.course_val',
            'currency.id',
            'currency.description',
            'currency.code',
            'currency.symbol',
            'currency.decimals',
          ])
          .leftJoin(
            'interest_areas.course_interest_areas',
            'course_interest_area',
          )
          .leftJoin('course_interest_area.course', 'course')
          .leftJoin('course.user', 'user')
          .leftJoin('course.organization', 'organization')
          .leftJoin('course.course_status', 'course_status')
          .leftJoin('course.course_competences', 'course_competences')
          .leftJoin(
            'course.course_users',
            'course_user',
            'course_user.user_id = :user_id AND course_user.course_id = course.id AND course_user.deleted_at is null',
            {
              user_id,
            },
          )
          .leftJoin(
            'course.course_fee_schedules',
            'fee',
            '(now() BETWEEN fee.begin AND fee.end) AND fee.course_id = course.id',
          )
          .leftJoin('fee.currency', 'currency')
          .leftJoin('course_user.user', 'student')
          .getMany();
        break;
      case 'student':
        list = await this.repository
          .createQueryBuilder('interest_areas')
          .select([
            'interest_areas.id',
            'interest_areas.description',
            'course_interest_area.course_id',
            'course.id',
            'course.name',
            'course.code',
            'course.description',
            'course.picture',
            'course.short_name',
            'course.free',
            'course.user_id',
            'user.id',
            'user.name',
            'fee.course_val',
            // 'fee.certificate_val',
            'currency.id',
            'currency.description',
            'currency.code',
            'currency.symbol',
            'currency.decimals',
          ])
          .leftJoin(
            'interest_areas.course_interest_areas',
            'course_interest_area',
          )
          .leftJoin('course_interest_area.course', 'course')
          .innerJoinAndSelect(
            'course.course_users',
            'course_user',
            'course_user.user_id = :user_id AND course_user.course_id = course.id AND course_user.deleted_at isnull',
            {
              user_id,
            },
          )
          .leftJoin(
            'course.course_fee_schedules',
            'fee',
            '(now() BETWEEN fee.begin AND fee.end) AND fee.course_id = course.id',
          )
          .leftJoin('fee.currency', 'currency')
          .leftJoin('course.user', 'user')
          .leftJoin('course.organization', 'organization')
          .leftJoin('course.course_status', 'course_status')
          .leftJoin('course.course_competences', 'course_competences')
          .getMany();
        break;
      case 'teacher':
        list = await this.repository
          .createQueryBuilder('interest_areas')
          .select([
            'interest_areas.id',
            'interest_areas.description',
            'course_interest_area.course_id',
            'course.id',
            'course.name',
            'course.code',
            'course.description',
            'course.picture',
            'course.short_name',
            'course.free',
            'course.user_id',
            'user.id',
            'user.name',
            'fee.course_val',
            'currency.id',
            'currency.description',
            'currency.code',
            'currency.symbol',
            'currency.decimals',
          ])
          .leftJoin(
            'interest_areas.course_interest_areas',
            'course_interest_area',
          )
          .leftJoin('course_interest_area.course', 'course')
          .leftJoin(
            'course.course_fee_schedules',
            'fee',
            '(now() BETWEEN fee.begin AND fee.end) AND fee.course_id = course.id',
          )
          .leftJoin('fee.currency', 'currency')
          .leftJoin('course.user', 'user')
          .leftJoin('course.organization', 'organization')
          .leftJoin('course.course_status', 'course_status')
          .leftJoin('course.course_competences', 'course_competences')
          .where('course.user_id = :user_id', { user_id })
          .getMany();
        break;
    }
    let courses_ids = [];
    list.map((i) => {
      courses_ids = courses_ids.concat(
        i.course_interest_areas.map((j) => String(j.course_id)),
      );
    });
    const info_sum = await this.coursesService.getDurations(courses_ids);
    const dataprogress = await this.lessonsService.findProgessByCourse(
      courses_ids,
      user_id,
    );
    for (let i = 0; i < list.length; i++) {
      const interest_area = list[i];
      if (interest_area.course_interest_areas) {
        for (let j = 0; j < interest_area.course_interest_areas.length; j++) {
          const course_area: any = interest_area.course_interest_areas[j];
          if (course_area.course) {
            if (course_area.course.picture) {
              course_area.course.picture = await this.awsService.getFile(
                course_area.course.picture,
              );
            }
            if (type_user == 'student') {
              const idx = dataprogress
                .map((d) => d.id)
                .indexOf(course_area.course.id);
              if (idx >= 0) {
                course_area.course['duration'] = dataprogress[idx]['duration'];
                course_area.course['progress'] = dataprogress[idx]['progress'];
              }
            }

            course_area.course['fee'] =
              course_area.course.course_fee_schedules?.length > 0
                ? course_area.course.course_fee_schedules[0]
                : null;
            delete course_area.course.course_fee_schedules;
          }
          if (course_area.course.course_users) {
            const user: any = Object.assign(
              [],
              course_area.course.course_users,
            );
            delete course_area.course.course_users;
            course_area.student = user?.length > 0 ? user[0].user : null;
          }
          if (course_area.course.course_fee_schedules) {
            const prices: any = Object.assign(
              [],
              course_area.course.course_fee_schedules,
            );
            delete course_area.course.course_fee_schedules;
            course_area.course_val =
              prices?.length > 0 ? Number(prices[0].course_val) : null;
            let suma = info_sum
              .map((i) => i.course_id)
              .indexOf(course_area.course_id);
            suma = suma >= 0 ? info_sum[suma].duration : 0;
            course_area.duration = `${timeConvert(suma)}`;
          }
        }
      }
    }
    return list;
  }

  async findGroupProgram(user_id: number, type_user: string): Promise<any[]> {
    let list: InterestAreas[] = [];
    switch (type_user) {
      case 'all':
        list = await this.repository
          .createQueryBuilder('interest_areas')
          .select([
            'interest_areas.id',
            'interest_areas.description',
            'program_interest_area.program_id',
            'program.id',
            'program.name',
            'program.description',
            'program.picture',
            'program_user',
            'program_user.user',
            'student.id',
            'student.name',
            'fee.program_val',
            'currency.id',
            'currency.description',
            'currency.code',
            'currency.symbol',
            'currency.decimals',
          ])
          .leftJoin(
            'interest_areas.program_interest_areas',
            'program_interest_area',
          )
          .leftJoin('program_interest_area.program', 'program')
          .leftJoin('program.organization', 'organization')
          .leftJoin('program.program_status', 'program_status')
          .leftJoin(
            'program.program_users',
            'program_user',
            'program_user.user_id = :user_id AND program_user.program_id = program.id AND program_user.deleted_at is null',
            {
              user_id,
            },
          )
          .leftJoin(
            'program.program_fee_schedules',
            'fee',
            '(now() BETWEEN fee.begin AND fee.end) AND fee.program_id = program.id',
          )
          .leftJoin('fee.currency', 'currency')
          .leftJoin('program_user.user', 'student')
          .getMany();
        break;
    }

    list.map((item) => {
      item.program_interest_areas.map(async (item2) => {
        item2.program.picture = await this.awsService.getFile(
          item2.program.picture,
        );
      });
    });

    return list;
  }
}
