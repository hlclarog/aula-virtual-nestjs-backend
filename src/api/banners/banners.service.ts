import { Inject, Injectable } from '@nestjs/common';
import {
  CreateBannersDto,
  UpdateBannersDto,
  BANNERS_PROVIDER,
} from './banners.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { Banners } from './banners.entity';

@Injectable()
export class BannersService extends BaseService<
  Banners,
  CreateBannersDto,
  UpdateBannersDto
> {
  @Inject(BANNERS_PROVIDER) repository: BaseRepo<Banners>;
}
