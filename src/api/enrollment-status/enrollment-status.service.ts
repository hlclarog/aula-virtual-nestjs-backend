import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import { EnrollmentStatus } from './enrollment-status.entity';
import {
  CreateEnrollmentStatusDto,
  ENROLLMENT_STATUS_PROVIDER,
  UpdateEnrollmentStatusDto,
} from './enrollment-status.dto';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class EnrollmentStatusService extends BaseService<
  EnrollmentStatus,
  CreateEnrollmentStatusDto,
  UpdateEnrollmentStatusDto
> {
  @Inject(ENROLLMENT_STATUS_PROVIDER) repository: BaseRepo<EnrollmentStatus>;
}
