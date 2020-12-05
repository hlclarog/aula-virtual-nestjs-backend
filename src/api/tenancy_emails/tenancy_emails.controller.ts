import { Controller } from '@nestjs/common';
import { TenancyEmailsService } from './tenancy_emails.service';
import {
  CreateTenancyEmailsDto,
  UpdateTenancyEmailsDto,
} from './tenancy_emails.dto';
import { BaseController } from '../../base/base.controller';
import { TenancyEmails } from './tenancy_emails.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tenancy_emails')
@Controller('/api/tenancy_emails')
export class TenancyEmailsController extends BaseController<
  TenancyEmails,
  CreateTenancyEmailsDto,
  UpdateTenancyEmailsDto
> {
  constructor(tenancy_emailsService: TenancyEmailsService) {
    super(tenancy_emailsService);
  }
}
