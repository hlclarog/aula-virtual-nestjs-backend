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
          .leftJoinAndSelect(
            'interest_areas.course_interest_areas',
            'course_interest_area',
          )
          .leftJoinAndSelect('course_interest_area.course', 'course')
          .leftJoinAndSelect('course.user', 'user')
          .leftJoinAndSelect('course.organization', 'organization')
          .leftJoinAndSelect('course.course_status', 'course_status')
          .leftJoinAndSelect('course.course_competences', 'course_competences')
          .getMany();
      case 'student':
        list = await this.repository
          .createQueryBuilder('interest_areas')
          .leftJoinAndSelect(
            'interest_areas.course_interest_areas',
            'course_interest_area',
          )
          .leftJoinAndSelect('course_interest_area.course', 'course')
          .innerJoin(
            'course.course_users',
            'course_user',
            'course_user.user_id = :user_id AND course_user.course_id = course.id AND course_user.deleted_at isnull',
            {
              user_id,
            },
          )
          .leftJoinAndSelect('course.user', 'user')
          .leftJoinAndSelect('course.organization', 'organization')
          .leftJoinAndSelect('course.course_status', 'course_status')
          .leftJoinAndSelect('course.course_competences', 'course_competences')
          .getMany();
      case 'teacher':
        list = await this.repository
          .createQueryBuilder('interest_areas')
          .leftJoinAndSelect(
            'interest_areas.course_interest_areas',
            'course_interest_area',
          )
          .leftJoinAndSelect('course_interest_area.course', 'course')
          .leftJoinAndSelect('course.user', 'user')
          .leftJoinAndSelect('course.organization', 'organization')
          .leftJoinAndSelect('course.course_status', 'course_status')
          .leftJoinAndSelect('course.course_competences', 'course_competences')
          .where('course.user_id = :user_id', { user_id })
          .getMany();
    }
    for (let i = 0; i < list.length; i++) {
      const interest_area = list[i];
      for (let j = 0; j < interest_area.course_interest_areas.length; j++) {
        const course_area = interest_area.course_interest_areas[j];
        if (course_area.course.picture) {
          course_area.course.picture = await this.awsService.getFile(
            course_area.course.picture,
          );
        }
      }
    }
    return list;
  }
}
