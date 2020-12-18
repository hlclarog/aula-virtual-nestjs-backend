import { Module } from '@nestjs/common';
import { TenancyStatusService } from './tenancy_status.service';
import { TenancyStatusController } from './tenancy_status.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { TENANCY_STATUS_PROVIDER } from './tenancy_status.dto';
import { TenancyStatus } from './tenancy_status.entity';

@Module({
  controllers: [TenancyStatusController],
  providers: [
    {
      provide: TENANCY_STATUS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(TenancyStatus),
    },
    TenancyStatusService,
  ],
})
export class TenancyStatusModule {}
