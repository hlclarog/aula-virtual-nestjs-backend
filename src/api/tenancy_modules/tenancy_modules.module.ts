import { Module } from '@nestjs/common';
import { TenancyModulesService } from './tenancy_modules.service';
import { TenancyModulesController } from './tenancy_modules.controller';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { TENANCY_MODULES_PROVIDER } from './tenancy_modules.dto';
import { TenancyModules } from './tenancy_modules.entity';

@Module({
  controllers: [TenancyModulesController],
  providers: [
    {
      provide: TENANCY_MODULES_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(TenancyModules),
    },
    TenancyModulesService,
  ],
})
export class TenancyModulesModule {}
