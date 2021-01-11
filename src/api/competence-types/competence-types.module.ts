import { Module } from '@nestjs/common';
import { CompetenceTypesService } from './competence-types.service';
import { CompetenceTypesController } from './competence-types.controller';
import { COMPETENCE_TYPES_PROVIDER } from './competence-types.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { CompetenceType } from './competence-type.entity';
import { InstanceProcessModule } from '../../queues/instance_process/instance_process.module';

@Module({
  imports: [InstanceProcessModule],
  controllers: [CompetenceTypesController],
  providers: [
    {
      provide: COMPETENCE_TYPES_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(CompetenceType),
    },
    CompetenceTypesService,
  ],
})
export class CompetenceTypesModule {}
