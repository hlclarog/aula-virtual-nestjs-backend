import { Module } from '@nestjs/common';
import { PlanModulesService } from './plan_modules.service';
import { PlanModulesController } from './plan_modules.controller';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { PLAN_MODULES_PROVIDER } from './plan_modules.dto';
import { PlanModules } from './plan_modules.entity';

@Module({
  controllers: [PlanModulesController],
  providers: [
    {
      provide: PLAN_MODULES_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(PlanModules),
    },
    PlanModulesService,
  ],
  exports: [PlanModulesService],
})
export class PlanModulesModule {}
