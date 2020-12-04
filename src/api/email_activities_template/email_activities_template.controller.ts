import { Controller } from '@nestjs/common';
import { EmailActivitiesTemplateService } from './email_activities_template.service';
import { CreateEmailActivitiesTemplateDto, UpdateEmailActivitiesTemplateDto } from './email_activities_template.dto';
import { BaseController } from '../../base/base.controller';
import { EmailActivitiesTemplate } from './email_activities_template.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('email_activities_template')
@Controller('/api/email_activities_template')
export class EmailActivitiesTemplateController extends BaseController<
  EmailActivitiesTemplate,
  CreateEmailActivitiesTemplateDto,
  UpdateEmailActivitiesTemplateDto
> {
  constructor(email_activities_templateService: EmailActivitiesTemplateService) {
    super(email_activities_templateService);
  }
}
