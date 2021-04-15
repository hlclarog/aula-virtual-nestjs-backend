import { Inject, Injectable } from '@nestjs/common';
import {
  CreateUserOrganizationsDto,
  UpdateUserOrganizationsDto,
  USER_ORGANIZATIONS_PROVIDER,
} from './user_organizations.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { UserOrganizations } from './user_organizations.entity';
import { AwsService } from './../../aws/aws.service';

@Injectable()
export class UserOrganizationsService extends BaseService<
  UserOrganizations,
  CreateUserOrganizationsDto,
  UpdateUserOrganizationsDto
> {
  @Inject(USER_ORGANIZATIONS_PROVIDER) repository: BaseRepo<UserOrganizations>;

  constructor(private awsService: AwsService) {
    super();
  }
}
