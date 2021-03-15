import { Inject, Injectable } from '@nestjs/common';
import {
  SetPointReasonsValueDto,
  POINT_REASON_PROVIDER,
} from './point_reasons_value.dto';
import { BaseRepo } from '../../base/base.repository';
import { PointReasonsValue } from './point_reasons_value.entity';

@Injectable()
export class PointReasonsValueService {
  @Inject(POINT_REASON_PROVIDER) repository: BaseRepo<PointReasonsValue>;

  constructor() {}

  async find(): Promise<PointReasonsValue[]> {
    return await this.repository
      .createQueryBuilder('point_reason_value')
      .select([
        'point_reason_value.id',
        'point_reason_value.point_reason_id',
        'point_reason_value.points',
        'point_reason.id',
        'point_reason.description',
      ])
      .leftJoin('point_reason_value.point_reason', 'point_reason')
      .getMany();
  }

  async findForType(point_reason_id): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('point_reason_value')
      .select(['point_reason_value.points'])
      .where('point_reason_value.point_reason_id = :point_reason_id', {
        point_reason_id,
      })
      .getOne();
    return result ? (result.points ? Number(result.points) : 0) : 0;
  }

  async update(updateDto: SetPointReasonsValueDto) {
    for (let i = 0; i < updateDto.reasons.length; i++) {
      const element = updateDto.reasons[i];
      const info = Object.assign({}, element);
      const data = await this.repository.findOne({
        point_reason_id: element.point_reason_id,
      });
      if (data) {
        await this.repository.update(data.id, {
          points: element.points,
        });
      } else {
        await this.repository.save(info);
      }
    }
    return this.find();
  }
}
