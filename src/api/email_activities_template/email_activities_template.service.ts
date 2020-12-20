import { Inject, Injectable } from '@nestjs/common';
import {
  CreateEmailActivitiesTemplateDto,
  UpdateEmailActivitiesTemplateDto,
  EMAIL_ACTIVITIES_TEMPLATE_PROVIDER,
} from './email_activities_template.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { EmailActivitiesTemplate } from './email_activities_template.entity';
import { EmailTemplates } from '../email_templates/email_templates.entity';
import { EmailActivities } from '../email_activities/email_activities.entity';

@Injectable()
export class EmailActivitiesTemplateService extends BaseService<
  EmailActivitiesTemplate,
  CreateEmailActivitiesTemplateDto,
  UpdateEmailActivitiesTemplateDto
> {
  @Inject(EMAIL_ACTIVITIES_TEMPLATE_PROVIDER)
  repository: BaseRepo<EmailActivitiesTemplate>;

  constructor() {
    super();
  }

  async createGroup(
    emailTemplate: EmailTemplates,
    emailActivities: EmailActivities[],
  ) {
    const values: any[] = emailActivities.map((emailActivity) => {
      return {
        email_template: emailTemplate.id,
        email_activity: emailActivity.id,
      };
    });

    await this.repository
      .createQueryBuilder()
      .insert()
      .into(EmailActivitiesTemplate)
      .values(values)
      .execute();
    return { update: true };
  }
}
