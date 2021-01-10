import { Module } from '@nestjs/common';
import { TenanciesService } from './tenancies.service';
import { TenanciesController } from './tenancies.controller';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { TENANCIES_PROVIDER } from './tenancies.dto';
import { Tenancies } from './tenancies.entity';
import { InstanceProcessModule } from '../../queues/instance_process/instance_process.module';
import { InstanceProcessLogModule } from './../../queues/instance_process_log/instance_process_log.module';
import { CryptoService } from '../../utils/services/crypto.service';

@Module({
  imports: [InstanceProcessModule, InstanceProcessLogModule],
  controllers: [TenanciesController],
  providers: [
    {
      provide: TENANCIES_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(Tenancies),
    },
    TenanciesService,
    CryptoService,
  ],
})
export class TenanciesModule {}
