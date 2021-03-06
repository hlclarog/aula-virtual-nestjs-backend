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

  async findAll(): Promise<Clients[]> {
    return await this.repository
      .createQueryBuilder('client')
      .select([
        'client.id',
        'client.name',
        'client.dni',
        'client.agent_name',
        'client.agent_phone',
        'client.agent_email',
        'client.agent_cellphone',
        'client.billing_name',
        'client.billing_phone',
        'client.billing_email',
        'client.billing_cellphone',
        'client.active',
        'client.identification_type_id',
        'identification_type.id',
        'identification_type.description',
      ])
      .leftJoin('client.identification_type', 'identification_type')
      .getMany();
  }
}
