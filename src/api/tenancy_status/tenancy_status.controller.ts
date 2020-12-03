import { Controller } from '@nestjs/common';
import { TenancyStatusService } from './tenancy_status.service';
import {
  CreateTenancyStatusDto,
  UpdateTenancyStatusDto,
} from './tenancy_status.dto';
import { BaseController } from '../../base/base.controller';
import { TenancyStatus } from './tenancy_status.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tenancy_status')
@Controller('/api/tenancy_status')
export class TenancyStatusController extends BaseController<
  TenancyStatus,
  CreateTenancyStatusDto,
  UpdateTenancyStatusDto
> {
  constructor(tenancy_statusService: TenancyStatusService) {
    super(tenancy_statusService);
  }
}
