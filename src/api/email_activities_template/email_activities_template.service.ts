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
import {
  INFO_TENANCY_PROVIDER,
  InfoTenancyDomain,
} from '../../utils/providers/info-tenancy.module';
import { TenancyConfigService } from '../tenancy_config/tenancy_config.service';

@Injectable()
export class EmailActivitiesTemplateService extends BaseService<
  EmailActivitiesTemplate,
  CreateEmailActivitiesTemplateDto,
  UpdateEmailActivitiesTemplateDto
> {
  @Inject(EMAIL_ACTIVITIES_TEMPLATE_PROVIDER)
  repository: BaseRepo<EmailActivitiesTemplate>;
  @Inject(INFO_TENANCY_PROVIDER) private tenancy: InfoTenancyDomain;

  constructor(private tenancyConfigService: TenancyConfigService) {
    super();
  }

  async createGroup(
    emailTemplate: EmailTemplates,
    emailActivities: EmailActivities[],
  ) {
    const configTenancy = await this.tenancyConfigService.findOne(
      this.tenancy.id,
    );
    const values: any[] = emailActivities.map((emailActivity) => {
      return {
        email_template_id: emailTemplate.id,
        email_activity_id: emailActivity.id,
        tenancy_email_id: configTenancy.tenancy_email_default_id,
        subject: emailActivity.default_subject,
        body: emailActivity.default_body,
        observations: emailActivity.observations,
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

  async byEmailTemplate(id: number) {
    console.log(id);
    return this.repository
      .createQueryBuilder()
      .where('email_template_id = :id', { id })
      .getMany();
  }
}
