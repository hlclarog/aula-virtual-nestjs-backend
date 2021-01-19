import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import { EnrollmentTypes } from './enrollment-types.entity';
import {
  CreateEnrollmentTypesDto,
  ENROLLMENT_TYPES_PROVIDER,
  UpdateEnrollmentTypesDto,
} from './enrollment-types.dto';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class EnrollmentTypesService extends BaseService<
  EnrollmentTypes,
  CreateEnrollmentTypesDto,
  UpdateEnrollmentTypesDto
> {
  @Inject(ENROLLMENT_TYPES_PROVIDER) repository: BaseRepo<EnrollmentTypes>;
}
