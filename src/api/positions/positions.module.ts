import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { POSITIONS_PROVIDER } from './positions.dto';
import { Positions } from './positions.entity';
import { PositionCompetencesModule } from '../position_competences/position_competences.module';

@Module({
  imports: [PositionCompetencesModule],
  controllers: [PositionsController],
  providers: [
    {
      provide: POSITIONS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(Positions),
    },
    PositionsService,
  ],
  exports: [POSITIONS_PROVIDER, PositionsService],
})
export class PositionsModule {}
