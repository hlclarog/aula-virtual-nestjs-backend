import { Inject, Injectable } from '@nestjs/common';
import {
  CreateEmailTemplatesDto,
  UpdateEmailTemplatesDto,
  EMAIL_TEMPLATES_PROVIDER,
} from './email_templates.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { EmailTemplates } from './email_templates.entity';
import { EmailActivitiesTemplateService } from '../email_activities_template/email_activities_template.service';
import { EmailActivitiesService } from '../email_activities/email_activities.service';
import { Users } from '../acl/users/users.entity';

@Injectable()
export class EmailTemplatesService extends BaseService<
  EmailTemplates,
  CreateEmailTemplatesDto,
  UpdateEmailTemplatesDto
> {
  @Inject(EMAIL_TEMPLATES_PROVIDER) repository: BaseRepo<EmailTemplates>;

  constructor(
    private emailActivitiesTemplateService: EmailActivitiesTemplateService,
    private emailActivities: EmailActivitiesService,
  ) {
    super();
  }

  async create(createDto: CreateEmailTemplatesDto) {
    const dataSave = await this.repository.save(createDto);
    const emailActivitiesAll = await this.emailActivities.findAll();
    await this.emailActivitiesTemplateService.createGroup(
      dataSave,
      emailActivitiesAll,
    );
    return dataSave;
  }

  async findOne(id: number) {
    return this.repository.findOneOrFail(id, {
      relations: ['email_activities_template'],
    });
  }
}
