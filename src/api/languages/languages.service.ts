import { Inject, Injectable } from '@nestjs/common';
import {
  CreateLanguagesDto,
  UpdateLanguagesDto,
  LANGUAGES_PROVIDER,
} from './languages.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base-repo';
import { Languages } from './languages.entity';

@Injectable()
export class LanguagesService extends BaseService<
  Languages,
  CreateLanguagesDto,
  UpdateLanguagesDto
> {
  @Inject(LANGUAGES_PROVIDER) repository: BaseRepo<Languages>;
}
