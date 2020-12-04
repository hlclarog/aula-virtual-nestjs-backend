import { Inject, Injectable } from '@nestjs/common';
import {
  CreateEmailActivitiesTemplateDto,
  UpdateEmailActivitiesTemplateDto,
  EMAIL_ACTIVITIES_TEMPLATE_PROVIDER,
} from './email_activities_template.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base-repo';
import { EmailActivitiesTemplate } from './email_activities_template.entity';

@Injectable()
export class EmailActivitiesTemplateService extends BaseService<
  EmailActivitiesTemplate,
  CreateEmailActivitiesTemplateDto,
  UpdateEmailActivitiesTemplateDto
> {
  @Inject(EMAIL_ACTIVITIES_TEMPLATE_PROVIDER)
  repository: BaseRepo<EmailActivitiesTemplate>;
}
