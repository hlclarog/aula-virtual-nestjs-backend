import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { TENANCY_PROVIDER } from '../../../database/database.dto';
import { Connection } from 'typeorm';
import { MODULES_PROVIDER } from './modules.dto';
import { Modules } from './modules.entity';

@Module({
  controllers: [ModulesController],
  providers: [
    {
      provide: MODULES_PROVIDER,
      inject: [TENANCY_PROVIDER],
      useFactory: (connection: Connection) => connection.getRepository(Modules),
    },
    ModulesService,
  ],
  exports: [ModulesService],
})
export class ModulesModule {}
