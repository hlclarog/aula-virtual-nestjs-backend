import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { PointReasons } from '../point_reasons/point_reasons.entity';
import { POINT_REASON_ENTITY } from './point_reasons_value.dto';

@Entity({ name: POINT_REASON_ENTITY })
export class PointReasonsValue extends Base {
  @ManyToOne(
    () => PointReasons,
    (point_reason) => point_reason.point_reason_values,
  )
  @JoinColumn({ name: 'point_reason_id' })
  point_reason: PointReasons;
  @RelationId(
    (point_reasons_value: PointReasonsValue) =>
      point_reasons_value.point_reason,
  )
  @Column({ type: 'integer' })
  point_reason_id: number;

  @Column({ type: 'decimal', default: 0.0 })
  points: number;
}
