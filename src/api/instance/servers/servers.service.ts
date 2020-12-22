import { Inject, Injectable } from '@nestjs/common';
import {
  CreateServersDto,
  UpdateServersDto,
  SERVERS_PROVIDER,
} from './servers.dto';
import { BaseService } from '../../../base/base.service';
import { BaseRepo } from '../../../base/base.repository';
import { Servers } from './servers.entity';

@Injectable()
export class ServersService extends BaseService<
  Servers,
  CreateServersDto,
  UpdateServersDto
> {
  @Inject(SERVERS_PROVIDER) repository: BaseRepo<Servers>;
}
