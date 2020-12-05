import { Controller } from '@nestjs/common';
import { EmailTemplatesService } from './email_templates.service';
import {
  CreateEmailTemplatesDto,
  UpdateEmailTemplatesDto,
} from './email_templates.dto';
import { BaseController } from '../../base/base.controller';
import { EmailTemplates } from './email_templates.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('email_templates')
@Controller('/api/email_templates')
export class EmailTemplatesController extends BaseController<
  EmailTemplates,
  CreateEmailTemplatesDto,
  UpdateEmailTemplatesDto
> {
  constructor(email_templatesService: EmailTemplatesService) {
    super(email_templatesService);
  }
}
