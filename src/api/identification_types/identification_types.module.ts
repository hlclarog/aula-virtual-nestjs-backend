import { Module } from '@nestjs/common';
import { IdentificationTypesService } from './identification_types.service';
import { IdentificationTypesController } from './identification_types.controller';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { IDENTIFICATION_TYPES_PROVIDER } from './identification_types.dto';
import { IdentificationTypes } from './identification_types.entity';

@Module({
  controllers: [IdentificationTypesController],
  providers: [
    {
      provide: IDENTIFICATION_TYPES_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(IdentificationTypes),
    },
    IdentificationTypesService,
  ],
})
export class IdentificationTypesModule {}
