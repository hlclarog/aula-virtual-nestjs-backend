import { Module } from '@nestjs/common';
import { ProgramTypesService } from './program_types.service';
import { ProgramTypesController } from './program_types.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { PROGRAM_TYPES_PROVIDER } from './program_types.dto';
import { ProgramTypes } from './program_types.entity';

@Module({
  controllers: [ProgramTypesController],
  providers: [
    {
      provide: PROGRAM_TYPES_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ProgramTypes),
    },
    ProgramTypesService,
  ],
})
export class ProgramTypesModule {}
