import { Inject, Injectable } from '@nestjs/common';
import {
  BuyLivesDto,
  CreatePointsUserLogDto,
  FilterPointsUserLogDto,
  PointsGerenerated,
  POINTS_USER_LOG_PROVIDER,
  TypesReasonsPoints,
} from './points_user_log.dto';
import { BaseRepo } from '../../base/base.repository';
import { PointsUserLog } from './points_user_log.entity';
import { PointReasonsValue } from '../point_reasons_value/point_reasons_value.entity';
import { Users } from '../acl/users/users.entity';
import { USERS_PROVIDER } from '../acl/users/users.dto';
import { subtractDaysForActualDate } from './../../utils/date';
import { PointReasonsValueService } from '../point_reasons_value/point_reasons_value.service';
import { GatewayService } from './../../utils/services/gateway.service';

@Injectable()
export class PointsUserLogService {
  constructor(
    @Inject(POINTS_USER_LOG_PROVIDER)
    private repository: BaseRepo<PointsUserLog>,
    @Inject(USERS_PROVIDER) private repository_users: BaseRepo<Users>,
    private pointReasonsValueService: PointReasonsValueService,
    private datewayService: GatewayService,
  ) {}

  async findForUser(user_id: number): Promise<PointReasonsValue[]> {
    return await this.repository
      .createQueryBuilder('log')
      .select([
        'log.id',
        'log.user_id',
        'log.point_reason_id',
        'log.points',
        'point_reason.id',
        'point_reason.description',
      ])
      .leftJoin('log.point_reason', 'point_reason')
      .where('log.user_id = :user_id', { user_id })
      .getMany();
  }

  async findFiltered(
    filters: FilterPointsUserLogDto,
  ): Promise<PointReasonsValue[]> {
    return await this.repository
      .createQueryBuilder('log')
      .select([
        'log.id',
        'log.user_id',
        'log.point_reason_id',
        'log.points',
        'point_reason.id',
        'point_reason.description',
      ])
      .leftJoin('log.point_reason', 'point_reason')
      .where(
        `
          log.user_id = COALESCE(:user_id, log.user_id) and
          log.point_reason_id = COALESCE(:point_reason_id, log.point_reason_id) and
          COALESCE(log.course_id, 1) = COALESCE(:course_id,COALESCE(log.course_id, 1)) and
          COALESCE(log.lesson_id, 1) = COALESCE(:lesson_id,COALESCE(log.lesson_id, 1)) and
          COALESCE(log.activity_id, 1) = COALESCE(:activity_id,COALESCE(log.activity_id, 1)) and
          log.created_at BETWEEN COALESCE(:begin, log.created_at) AND COALESCE(:end, log.created_at)
        `,
        {
          user_id: filters.user_id,
          point_reason_id: filters.point_reason_id,
          course_id: filters.course_id,
          lesson_id: filters.lesson_id,
          activity_id: filters.activity_id,
          begin: filters.begin,
          end: filters.end,
        },
      )
      .getMany();
  }

  async create(createDto: CreatePointsUserLogDto) {
    await this.repository.save(createDto);
    return await this.updatePointsUser(
      createDto.user_id,
      createDto.points,
      createDto.lives,
    );
  }

  async buy_lives(buyDto: BuyLivesDto) {
    let points = 0;
    switch (buyDto.lives) {
      case 2:
        points = -10;
        break;
      case 4:
        points = -15;
        break;
      case 6:
        points = -20;
        break;
    }
    return await this.create({
      user_id: buyDto.user_id,
      point_reason_id: TypesReasonsPoints.BUY_LIVES,
      points: points,
      lives: buyDto.lives,
    });
  }

  async remove(id: number) {
    const item = await this.repository.findOne(id);
    this.updatePointsUser(item.user_id, item.points * -1);
    return await this.repository.softDelete(id);
  }

  async updatePointsUser(
    user_id: number,
    points: number,
    lives?: number,
  ): Promise<PointsGerenerated> {
    const user = await this.repository_users.findOne(user_id);
    const new_points = Number(user.points) + (points ? Number(points) : 0);
    const new_lives = Number(user.lives) + (lives ? Number(lives) : 0);
    await this.repository_users.update(user_id, {
      points: new_points,
      lives: new_lives,
    });
    await this.datewayService.emitChangeGamification({
      user_id,
      info: {
        user_id,
        points: new_points,
        lives: new_lives,
      },
    });
    return {
      user_id,
      points: new_points,
      lives: new_lives,
      generated: {
        points,
        lives,
      },
    };
  }

  async pointsUserTotalRangeDates(user_id: number, days: number) {
    const range = subtractDaysForActualDate(days);
    const result: any = await this.repository
      .createQueryBuilder('log')
      .select('coalesce(SUM(log.points),0)', 'points')
      .where(
        'log.user_id = :user_id  AND CAST(log.created_at as date) Between :begin AND :end',
        {
          user_id,
          begin: range.start,
          end: range.end,
        },
      )
      .getRawOne();
    const points = result.points ? Number(result.points) : 0;
    return points;
  }

  async generatePoints(
    user_id: number,
    reason_id: number,
    course_id?: number,
    lesson_id?: number,
    activity_id?: number,
  ) {
    const points = await this.pointReasonsValueService.findForType(reason_id);
    return await this.create({
      user_id: user_id,
      point_reason_id: reason_id,
      points: points,
      course_id: course_id,
      lesson_id: lesson_id,
      activity_id: activity_id,
    });
  }
}
