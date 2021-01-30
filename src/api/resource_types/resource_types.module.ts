import { Module } from '@nestjs/common';
import { ResourceTypesService } from './resource_types.service';
import { ResourceTypesController } from './resource_types.controller';
import { DATABASE_MANAGER_PROVIDER, DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { RESOURCE_TYPES_PROVIDER } from './resource_types.dto';
import { ResourceTypes } from './resource_types.entity';

@Module({
  controllers: [ResourceTypesController],
  providers: [
    {
      provide: RESOURCE_TYPES_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ResourceTypes),
    },
    ResourceTypesService,
  ],
})
export class ResourceTypesModule {}
