import { Inject, Injectable } from '@nestjs/common';
import {
  CreateEmailTemplatesDto,
  UpdateEmailTemplatesDto,
  EMAIL_TEMPLATES_PROVIDER,
} from './email_templates.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base-repo';
import { EmailTemplates } from './email_templates.entity';

@Injectable()
export class EmailTemplatesService extends BaseService<
  EmailTemplates,
  CreateEmailTemplatesDto,
  UpdateEmailTemplatesDto
> {
  @Inject(EMAIL_TEMPLATES_PROVIDER) repository: BaseRepo<EmailTemplates>;
}
