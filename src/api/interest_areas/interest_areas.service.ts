import { Inject, Injectable } from '@nestjs/common';
import {
  CreateInterestAreasDto,
  UpdateInterestAreasDto,
  INTEREST_AREAS_PROVIDER,
} from './interest_areas.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { InterestAreas } from './interest_areas.entity';
import { AwsService } from './../../aws/aws.service';

@Injectable()
export class InterestAreasService extends BaseService<
  InterestAreas,
  CreateInterestAreasDto,
  UpdateInterestAreasDto
> {
  constructor(private awsService: AwsService) {
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
            'course_user.user_id = :user_id AND course_user.course_id = course.id',
            {
              user_id,
            },
          )
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
          .where('course.user_id = :user_id', { user_id })
          .getMany();
        break;
    }
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
          }
          if (course_area.course.course_users) {
            const item: any = Object.assign(
              [],
              course_area.course.course_users,
            );
            delete course_area.course.course_users;
            course_area.student = item?.length > 0 ? item[0].user : null;
            course_area.price = 0;
            course_area.duration = '0 minutos';
          }
        }
      }
    }
    return list;
  }
}
