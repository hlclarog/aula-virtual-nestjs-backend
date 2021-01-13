import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { PLANS_PROVIDER } from './plans.dto';
import { Plans } from './plans.entity';
import { PlanModulesModule } from '../plan_modules/plan_modules.module';

@Module({
  imports: [PlanModulesModule],
  controllers: [PlansController],
  providers: [
    {
      provide: PLANS_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) => connection.getRepository(Plans),
    },
    PlansService,
  ],
})
export class PlansModule {}
