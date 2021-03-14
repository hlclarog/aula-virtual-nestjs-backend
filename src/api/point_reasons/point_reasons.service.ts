import { Inject, Injectable } from '@nestjs/common';
import {
  CreatePointReasonsDto,
  UpdatePointReasonsDto,
  POINT_REASONS_PROVIDER,
} from './point_reasons.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { PointReasons } from './point_reasons.entity';

@Injectable()
export class PointReasonsService extends BaseService<
  PointReasons,
  CreatePointReasonsDto,
  UpdatePointReasonsDto
> {
  @Inject(POINT_REASONS_PROVIDER) repository: BaseRepo<PointReasons>;
}
