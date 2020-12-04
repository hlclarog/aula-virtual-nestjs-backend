import { Inject, Injectable } from '@nestjs/common';
import {
  CreateTenancyEmailsDto,
  UpdateTenancyEmailsDto,
  TENANCY_EMAILS_PROVIDER,
} from './tenancy_emails.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base-repo';
import { TenancyEmails } from './tenancy_emails.entity';

@Injectable()
export class TenancyEmailsService extends BaseService<
  TenancyEmails,
  CreateTenancyEmailsDto,
  UpdateTenancyEmailsDto
> {
  @Inject(TENANCY_EMAILS_PROVIDER) repository: BaseRepo<TenancyEmails>;
}
