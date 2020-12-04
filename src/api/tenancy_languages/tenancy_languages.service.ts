import { Inject, Injectable } from '@nestjs/common';
import {
  CreateTenancyLanguagesDto,
  UpdateTenancyLanguagesDto,
  TENANCY_LANGUAGES_PROVIDER,
} from './tenancy_languages.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base-repo';
import { TenancyLanguages } from './tenancy_languages.entity';

@Injectable()
export class TenancyLanguagesService extends BaseService<
  TenancyLanguages,
  CreateTenancyLanguagesDto,
  UpdateTenancyLanguagesDto
> {
  @Inject(TENANCY_LANGUAGES_PROVIDER) repository: BaseRepo<TenancyLanguages>;
}
