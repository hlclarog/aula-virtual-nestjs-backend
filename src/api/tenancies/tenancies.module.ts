import { Module } from '@nestjs/common';
import { TenanciesService } from './tenancies.service';
import { TenanciesController } from './tenancies.controller';
import { TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { TENANCIES_PROVIDER } from './tenancies.dto';
import { Tenancies } from './tenancies.entity';

@Module({
  controllers: [TenanciesController],
  providers: [
    {
      provide: TENANCIES_PROVIDER,
      inject: [TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(Tenancies),
    },
    TenanciesService,
  ],
})
export class TenanciesModule {}
