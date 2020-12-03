import { Inject, Injectable } from '@nestjs/common';
import {
  CreateEmailTypesDto,
  UpdateEmailTypesDto,
  EMAIL_TYPES_PROVIDER,
} from './email_types.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base-repo';
import { EmailTypes } from './email_types.entity';

@Injectable()
export class EmailTypesService extends BaseService<
  EmailTypes,
  CreateEmailTypesDto,
  UpdateEmailTypesDto
> {
  @Inject(EMAIL_TYPES_PROVIDER) repository: BaseRepo<EmailTypes>;
}
