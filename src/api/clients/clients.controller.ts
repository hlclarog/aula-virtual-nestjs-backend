import { Controller } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientsDto, UpdateClientsDto } from './clients.dto';
import { BaseController } from '../../base/base.controller';
import { Clients } from './clients.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('clients')
@Controller('/api/clients')
export class ClientsController extends BaseController<
  Clients,
  CreateClientsDto,
  UpdateClientsDto
> {
  constructor(clientsService: ClientsService) {
    super(clientsService);
  }
}
