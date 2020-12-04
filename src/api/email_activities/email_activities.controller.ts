import { Controller } from '@nestjs/common';
import { EmailActivitiesService } from './email_activities.service';
import {
  CreateEmailActivitiesDto,
  UpdateEmailActivitiesDto,
} from './email_activities.dto';
import { BaseController } from '../../base/base.controller';
import { EmailActivities } from './email_activities.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('email_activities')
@Controller('/api/email_activities')
export class EmailActivitiesController extends BaseController<
  EmailActivities,
  CreateEmailActivitiesDto,
  UpdateEmailActivitiesDto
> {
  constructor(email_activitiesService: EmailActivitiesService) {
    super(email_activitiesService);
  }
}
