import { Module } from '@nestjs/common';
import { CollectionTypesService } from './collection_types.service';
import { CollectionTypesController } from './collection_types.controller';
import { InstanceProcessModule } from '../../queues/instance_process/instance_process.module';
import { COLLECTION_TYPES_PROVIDER } from './collection_types.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { CollectionTypes } from './collection_types.entity';

@Module({
  imports: [InstanceProcessModule],
  controllers: [CollectionTypesController],
  providers: [
    {
      provide: COLLECTION_TYPES_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(CollectionTypes),
    },
    CollectionTypesService,
  ],
})
export class CollectionTypesModule {}
