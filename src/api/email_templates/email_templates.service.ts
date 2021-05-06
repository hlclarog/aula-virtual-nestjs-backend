import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
import {
  INFO_TENANCY_PROVIDER,
  InfoTenancyDomain,
} from './../../utils/providers/info-tenancy.module';
import { TenancyConfigService } from '../tenancy_config/tenancy_config.service';

@Injectable()
export class EmailTemplatesService extends BaseService<
  EmailTemplates,
  CreateEmailTemplatesDto,
  UpdateEmailTemplatesDto
> {
  @Inject(EMAIL_TEMPLATES_PROVIDER) repository: BaseRepo<EmailTemplates>;
  @Inject(INFO_TENANCY_PROVIDER) private tenancy: InfoTenancyDomain;

  constructor(
    private emailActivitiesTemplateService: EmailActivitiesTemplateService,
    private emailActivities: EmailActivitiesService,
    private tenancyConfigService: TenancyConfigService,
  ) {
    super();
  }

  async findAll() {
    return await this.repository
      .createQueryBuilder('email_template')
      .select([
        'email_template.id',
        'email_template.description',
        'email_template.observations',
        'email_template.language_id',
        'language.id',
        'language.description',
        'email_template.active',
      ])
      .leftJoin('email_template.language', 'language')
      .getMany();
  }

  async create(createDto: CreateEmailTemplatesDto) {
    if (createDto.active) {
      await this.resetDefaultTemplate(createDto.language_id);
    }
    const configTenancy = await this.tenancyConfigService.findOne(
      this.tenancy.id,
    );
    if (configTenancy.tenancy_email_default_id) {
      const dataSave = await this.repository.save(createDto);
      const emailActivitiesAll = await this.emailActivities.findAll();
      await this.emailActivitiesTemplateService.createGroup(
        dataSave,
        emailActivitiesAll,
      );
      return dataSave;
    } else {
      throw new InternalServerErrorException(
        'Not set email config for default',
      );
    }
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
