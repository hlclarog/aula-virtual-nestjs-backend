import { Controller } from '@nestjs/common';
import { TenancyLanguagesService } from './tenancy_languages.service';
import {
  CreateTenancyLanguagesDto,
  UpdateTenancyLanguagesDto,
} from './tenancy_languages.dto';
import { BaseController } from '../../base/base.controller';
import { TenancyLanguages } from './tenancy_languages.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tenancy_languages')
@Controller('/api/tenancy_languages')
export class TenancyLanguagesController extends BaseController<
  TenancyLanguages,
  CreateTenancyLanguagesDto,
  UpdateTenancyLanguagesDto
> {
  constructor(tenancy_languagesService: TenancyLanguagesService) {
    super(tenancy_languagesService);
  }
}
