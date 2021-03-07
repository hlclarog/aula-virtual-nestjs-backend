import { Inject, Injectable } from '@nestjs/common';
import {
  CreateTenanciesDto,
  UpdateTenanciesDto,
  TENANCIES_PROVIDER,
  TENANCY_STATUS_ENUM,
} from './tenancies.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { Tenancies } from './tenancies.entity';
import { InjectQueue } from '@nestjs/bull';
import { INSTANCE_PROCESS_QUEUE } from '../../queues/instance_process/instance_process.dto';
import { Queue } from 'bull';
import { InstanceProcessLogService } from '../../queues/instance_process_log/instance_process_log.service';
import { CryptoService } from '../../utils/services/crypto.service';

@Injectable()
export class TenanciesService extends BaseService<
  Tenancies,
  CreateTenanciesDto,
  UpdateTenanciesDto
> {
  @Inject(TENANCIES_PROVIDER) repository: BaseRepo<Tenancies>;

  constructor(
    @InjectQueue(INSTANCE_PROCESS_QUEUE)
    private readonly instanceProcessQueue: Queue,
    private readonly instanceProcessLogService: InstanceProcessLogService,
    private cryptoService: CryptoService,
  ) {
    super();
  }

  async create(createDto: CreateTenanciesDto): Promise<any> {
    createDto.password = this.cryptoService.hashPassword(createDto.password);
    createDto.tenancy_status_id = TENANCY_STATUS_ENUM.StartProcessing;
    const dataSave = await this.repository.save(createDto);
    const tenancy = await this.repository.findOne(dataSave.id, {
      relations: ['front_server'],
    });
    await this.instanceProcessQueue.add('create', tenancy);
    return {
      message: 'Processing',
      data: tenancy,
    };
  }

  async processStaus() {
    const data = await this.instanceProcessLogService.findAll();
    return { data };
  }
}
