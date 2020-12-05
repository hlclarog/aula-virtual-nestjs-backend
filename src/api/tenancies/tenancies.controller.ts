import { Controller } from '@nestjs/common';
import { TenanciesService } from './tenancies.service';
import { CreateTenanciesDto, UpdateTenanciesDto } from './tenancies.dto';
import { BaseController } from '../../base/base.controller';
import { Tenancies } from './tenancies.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tenancies')
@Controller('/api/tenancies')
export class TenanciesController extends BaseController<
  Tenancies,
  CreateTenanciesDto,
  UpdateTenanciesDto
> {
  constructor(tenanciesService: TenanciesService) {
    super(tenanciesService);
  }
}
