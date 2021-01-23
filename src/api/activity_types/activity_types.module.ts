import { Module } from '@nestjs/common';
import { ActivityTypesService } from './activity_types.service';
import { ActivityTypesController } from './activity_types.controller';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { ACTIVITY_TYPES_PROVIDER } from './activity_types.dto';
import { ActivityTypes } from './activity_types.entity';

@Module({
  controllers: [ActivityTypesController],
  providers: [
    {
      provide: ACTIVITY_TYPES_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ActivityTypes),
    },
    ActivityTypesService,
  ],
})
export class ActivityTypesModule {}
