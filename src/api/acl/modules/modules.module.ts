import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../../database/database.dto';
import { Connection } from 'typeorm';
import { MODULES_PROVIDER } from './modules.dto';
import { Modules } from './modules.entity';
import { AwsModule } from '../../../aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [ModulesController],
  providers: [
    {
      provide: MODULES_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) => connection.getRepository(Modules),
    },
    ModulesService,
  ],
  exports: [MODULES_PROVIDER, ModulesService],
})
export class ModulesModule {}
