import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  INSTANCE_PROCESS_LOG_PROVIDER,
  SetInstanceProcessDto,
  SetMigrationsStatusInstanceProcessDto,
  SetRegisterStatusInstanceProcessDto,
  SetSchemaStatusInstanceProcessDto,
  SetSeedersStatusInstanceProcessDto,
  SetSubdomineStatusInstanceProcessDto,
  SetVirtualhostStatusInstanceProcessDto,
} from './instance_process_log.dto';
import { IntanceProcessLog } from './instance_process_log.entity';

@Injectable()
export class InstanceProcessLogService {
  @Inject(INSTANCE_PROCESS_LOG_PROVIDER)
  repository: Repository<IntanceProcessLog>;

  constructor() {}

  async create(data: SetInstanceProcessDto) {
    await this.repository.save({
      tenant: data.tenant,
      date: new Date().toString(),
      status_register: null,
      status_subdominio: null,
      status_virtualhost: null,
      status_schema: null,
    });
  }

  async setStatusRegister(data: SetRegisterStatusInstanceProcessDto) {
    await this.repository.update(
      { tenant: data.tenant },
      { status_register: data.status_register },
    );
  }

  async setStatusSubdomine(data: SetSubdomineStatusInstanceProcessDto) {
    await this.repository.update(
      { tenant: data.tenant },
      { status_subdomain: data.status_subdomain },
    );
  }

  async setStatusVirtualhost(data: SetVirtualhostStatusInstanceProcessDto) {
    await this.repository.update(
      { tenant: data.tenant },
      { status_virtualhost: data.status_virtualhost },
    );
  }

  async setStatusSchema(data: SetSchemaStatusInstanceProcessDto) {
    await this.repository.update(
      { tenant: data.tenant },
      { status_schema: data.status_schema },
    );
  }

  async setStatusMigrations(data: SetMigrationsStatusInstanceProcessDto) {
    await this.repository.update(
      { tenant: data.tenant },
      { status_migrations: data.status_migrations },
    );
  }

  async setStatusSeeders(data: SetSeedersStatusInstanceProcessDto) {
    await this.repository.update(
      { tenant: data.tenant },
      { status_seeders: data.status_seeders },
    );
  }

  async findAll(): Promise<IntanceProcessLog[]> {
    return await this.repository.find();
  }

  async remove(tenant: string) {
    await this.repository.delete({ tenant });
  }

  async removeAll() {
    await this.repository.remove(await this.repository.find());
  }
}
