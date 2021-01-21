import { Module } from '@nestjs/common';
import { ProgramInterestAreasService } from './program_interest_areas.service';
import { ProgramInterestAreasController } from './program_interest_areas.controller';
import { Connection } from 'typeorm';
import { PROGRAM_INTEREST_AREAS_PROVIDER } from './program_interest_areas.dto';
import { ProgramInterestAreas } from './program_interest_areas.entity';
import { DATABASE_TENANCY_PROVIDER } from './../../database/database.dto';

@Module({
  controllers: [ProgramInterestAreasController],
  providers: [
    {
      provide: PROGRAM_INTEREST_AREAS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ProgramInterestAreas),
    },
    ProgramInterestAreasService,
  ],
})
export class ProgramInterestAreasModule {}
