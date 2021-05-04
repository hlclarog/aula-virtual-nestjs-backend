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
    if (createDto.active) {
      await this.resetDefaultTemplate(createDto.language_id);
    }
    const dataSave = await this.repository.save(createDto);
    const emailActivitiesAll = await this.emailActivities.findAll();
    await this.emailActivitiesTemplateService.createGroup(
      dataSave,
      emailActivitiesAll,
    );
    return dataSave;
  }

  async update(id: number, updateDto: UpdateEmailTemplatesDto) {
    if (updateDto.active) {
      await this.resetDefaultTemplate(updateDto.language_id);
    }
    return await this.repository.update(id, updateDto);
  }

  async resetDefaultTemplate(language_id: number) {
    await this.repository.update(
      { active: true, language_id },
      { active: false },
    );
  }

  async findOne(id: number) {
    return this.repository.findOneOrFail(id, {
      relations: ['email_activities_template'],
    });
  }
}
