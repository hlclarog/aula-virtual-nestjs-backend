import { HttpModule, Module } from '@nestjs/common';
import { TenanciesService } from './tenancies.service';
import { TenanciesController } from './tenancies.controller';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { TENANCIES_PROVIDER } from './tenancies.dto';
import { Tenancies } from './tenancies.entity';

@Module({
  imports: [HttpModule],
  controllers: [TenanciesController],
  providers: [
    {
      provide: TENANCIES_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(Tenancies),
    },
    TenanciesService,
  ],
})
export class TenanciesModule {}
