import { Inject, Injectable } from '@nestjs/common';
import {
  CreateConnectionTypesDto,
  UpdateConnectionTypesDto,
  CONNECTION_TYPES_PROVIDER,
} from './connection_types.dto';
import { BaseService } from '../../../base/base.service';
import { BaseRepo } from '../../../base/base.repository';
import { ConnectionTypes } from './connection_types.entity';

@Injectable()
export class ConnectionTypesService extends BaseService<
  ConnectionTypes,
  CreateConnectionTypesDto,
  UpdateConnectionTypesDto
> {
  @Inject(CONNECTION_TYPES_PROVIDER) repository: BaseRepo<ConnectionTypes>;
}
