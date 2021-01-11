import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { InstanceProcessModule } from '../../queues/instance_process/instance_process.module';
import { CURRENCY_PROVIDER } from './currency.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { Currencies } from './currency.entity';

@Module({
  imports: [InstanceProcessModule],
  controllers: [CurrenciesController],
  providers: [
    {
      provide: CURRENCY_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(Currencies),
    },
    CurrenciesService,
  ],
})
export class CurrenciesModule {}
