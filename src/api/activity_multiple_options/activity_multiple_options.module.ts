import { Module } from '@nestjs/common';
import { ActivityMultipleOptionsService } from './activity_multiple_options.service';
import { ActivityMultipleOptionsController } from './activity_multiple_options.controller';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { ACTIVITY_MULTIPLE_OPTIONS_PROVIDER } from './activity_multiple_options.dto';
import { ActivityMultipleOptions } from './activity_multiple_options.entity';

@Module({
  controllers: [ActivityMultipleOptionsController],
  providers: [
    {
      provide: ACTIVITY_MULTIPLE_OPTIONS_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ActivityMultipleOptions),
    },
    ActivityMultipleOptionsService,
  ],
})
export class ActivityMultipleOptionsModule {}
