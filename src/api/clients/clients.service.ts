import { Inject, Injectable } from '@nestjs/common';
import {
  CreateClientsDto,
  UpdateClientsDto,
  CLIENTS_PROVIDER,
} from './clients.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { Clients } from './clients.entity';

@Injectable()
export class ClientsService extends BaseService<
  Clients,
  CreateClientsDto,
  UpdateClientsDto
> {
  @Inject(CLIENTS_PROVIDER) repository: BaseRepo<Clients>;
}
