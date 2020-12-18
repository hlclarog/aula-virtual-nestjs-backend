import { Inject, Injectable } from '@nestjs/common';
import {
  CreateEmailActivitiesDto,
  UpdateEmailActivitiesDto,
  EMAIL_ACTIVITIES_PROVIDER,
} from './email_activities.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { EmailActivities } from './email_activities.entity';

@Injectable()
export class EmailActivitiesService extends BaseService<
  EmailActivities,
  CreateEmailActivitiesDto,
  UpdateEmailActivitiesDto
> {
  @Inject(EMAIL_ACTIVITIES_PROVIDER) repository: BaseRepo<EmailActivities>;
}
