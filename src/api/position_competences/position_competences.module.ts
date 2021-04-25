import { Module } from '@nestjs/common';
import { PositionCompetencesService } from './position_competences.service';
import { PositionCompetencesController } from './position_competences.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { POSITIONS_COMPETENCES_PROVIDER } from './position_competences.dto';
import { PositionCompetences } from './position_competences.entity';

@Module({
  controllers: [PositionCompetencesController],
  providers: [
    {
      provide: POSITIONS_COMPETENCES_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(PositionCompetences),
    },
    PositionCompetencesService,
  ],
  exports: [POSITIONS_COMPETENCES_PROVIDER, PositionCompetencesService],
})
export class PositionCompetencesModule {}
