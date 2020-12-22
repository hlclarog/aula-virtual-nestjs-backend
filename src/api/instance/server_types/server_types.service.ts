import { Inject, Injectable } from '@nestjs/common';
import {
  CreateServerTypesDto,
  UpdateServerTypesDto,
  SERVER_TYPES_PROVIDER,
} from './server_types.dto';
import { BaseService } from '../../../base/base.service';
import { BaseRepo } from '../../../base/base.repository';
import { ServerTypes } from './server_types.entity';

@Injectable()
export class ServerTypesService extends BaseService<
  ServerTypes,
  CreateServerTypesDto,
  UpdateServerTypesDto
> {
  @Inject(SERVER_TYPES_PROVIDER) repository: BaseRepo<ServerTypes>;
}
