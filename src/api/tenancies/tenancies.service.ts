import { Inject, Injectable } from '@nestjs/common';
import {
  CreateTenanciesDto,
  UpdateTenanciesDto,
  TENANCIES_PROVIDER,
} from './tenancies.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { Tenancies } from './tenancies.entity';

@Injectable()
export class TenanciesService extends BaseService<
  Tenancies,
  CreateTenanciesDto,
  UpdateTenanciesDto
> {
  @Inject(TENANCIES_PROVIDER) repository: BaseRepo<Tenancies>;
}
