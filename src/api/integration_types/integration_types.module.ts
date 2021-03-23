import { Module } from '@nestjs/common';
import { IntegrationTypesService } from './integration_types.service';
import { IntegrationTypesController } from './integration_types.controller';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { INTEGRATION_TYPES_PROVIDER } from './integration_types.dto';
import { IntegrationTypes } from './integration_types.entity';

@Module({
  controllers: [IntegrationTypesController],
  providers: [
    {
      provide: INTEGRATION_TYPES_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(IntegrationTypes),
    },
    IntegrationTypesService,
  ],
  exports: [IntegrationTypesService],
})
export class IntegrationTypesModule {}
