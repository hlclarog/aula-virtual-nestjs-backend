import { Module } from '@nestjs/common';
import { CompetencesController } from './competences.controller';
import { InstanceProcessModule } from '../../queues/instance_process/instance_process.module';
import { COMPETENCES_PROVIDER } from './competences.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Competence } from './competence.entity';
import { Connection } from 'typeorm';
import { CompetencesService } from './competences.service';

@Module({
  imports: [InstanceProcessModule],
  controllers: [CompetencesController],
  providers: [
    {
      provide: COMPETENCES_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(Competence),
    },
    CompetencesService,
  ],
})
export class CompetencesModule {}
