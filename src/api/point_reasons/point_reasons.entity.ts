import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { PointsUserLog } from '../points_user_log/points_user_log.entity';
import { PointReasonsValue } from '../point_reasons_value/point_reasons_value.entity';
import { POINT_REASONS_ENTITY } from './point_reasons.dto';

@Entity({ name: POINT_REASONS_ENTITY, schema: 'public' })
export class PointReasons extends Base {
  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'boolean' })
  private: boolean;

  @OneToMany(
    () => PointReasonsValue,
    (point_reason_value) => point_reason_value.point_reason,
  )
  point_reason_values: PointReasonsValue[];

  @OneToMany(
    () => PointsUserLog,
    (point_user_log) => point_user_log.point_reason,
  )
  points_user_log: PointsUserLog[];
}
