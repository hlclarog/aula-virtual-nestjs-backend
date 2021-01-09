import { Inject, Injectable } from '@nestjs/common';
import { GatewayService } from './../../utils/services/gateway.service';
import { Repository } from 'typeorm';
import {
  EVENTS_PROCESS,
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

  constructor(private datewayService: GatewayService) {}

  async create(data: SetInstanceProcessDto) {
    const result = await this.repository.save({
      tenant: data.tenant,
      date: new Date().toString(),
      status_register: null,
      status_subdominio: null,
      status_virtualhost: null,
      status_schema: null,
    });
    this.datewayService.sendEventPrivate(EVENTS_PROCESS.NEW_TENANCY, {
      tenant: data.tenant,
      data: result,
    });
  }

  async setStatusRegister(data: SetRegisterStatusInstanceProcessDto) {
    await this.repository.update(
      { tenant: data.tenant },
      { status_register: data.status_register },
    );
    this.datewayService.sendEventPrivate(EVENTS_PROCESS.STATUS_REGISTER, {
      tenant: data.tenant,
      status_register: data.status_register,
    });
  }

  async setStatusSubdomine(data: SetSubdomineStatusInstanceProcessDto) {
    await this.repository.update(
      { tenant: data.tenant },
      { status_subdomain: data.status_subdomain },
    );
    this.datewayService.sendEventPrivate(EVENTS_PROCESS.STATUS_SUBDOMAIN, {
      tenant: data.tenant,
      status_subdomain: data.status_subdomain,
    });
  }

  async setStatusVirtualhost(data: SetVirtualhostStatusInstanceProcessDto) {
    await this.repository.update(
      { tenant: data.tenant },
      { status_virtualhost: data.status_virtualhost },
    );
    this.datewayService.sendEventPrivate(EVENTS_PROCESS.STATUS_VIRTUALHOST, {
      tenant: data.tenant,
      status_virtualhost: data.status_virtualhost,
    });
  }

  async setStatusSchema(data: SetSchemaStatusInstanceProcessDto) {
    await this.repository.update(
      { tenant: data.tenant },
      { status_schema: data.status_schema },
    );
    this.datewayService.sendEventPrivate(EVENTS_PROCESS.STATUS_SCHEMA, {
      tenant: data.tenant,
      status_schema: data.status_schema,
    });
  }

  async setStatusMigrations(data: SetMigrationsStatusInstanceProcessDto) {
    await this.repository.update(
      { tenant: data.tenant },
      { status_migrations: data.status_migrations },
    );
    this.datewayService.sendEventPrivate(EVENTS_PROCESS.STATUS_MIGRATIONS, {
      tenant: data.tenant,
      status_migrations: data.status_migrations,
    });
  }

  async setStatusSeeders(data: SetSeedersStatusInstanceProcessDto) {
    await this.repository.update(
      { tenant: data.tenant },
      { status_seeders: data.status_seeders },
    );
    this.datewayService.sendEventPrivate(EVENTS_PROCESS.STATUS_SEEDERS, {
      tenant: data.tenant,
      status_seeders: data.status_seeders,
    });
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
