import { Module } from '@nestjs/common';
import { ActivityMultipleOptionsService } from './activity_multiple_options.service';
import { ActivityMultipleOptionsController } from './activity_multiple_options.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { ACTIVITY_MULTIPLE_OPTIONS_PROVIDER } from './activity_multiple_options.dto';
import { ActivityMultipleOptions } from './activity_multiple_options.entity';
import { MultipleOptionAnswersModule } from '../multiple_option_answers/multiple_option_answers.module';

@Module({
  imports: [MultipleOptionAnswersModule],
  controllers: [ActivityMultipleOptionsController],
  providers: [
    {
      provide: ACTIVITY_MULTIPLE_OPTIONS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ActivityMultipleOptions),
    },
    ActivityMultipleOptionsService,
  ],
  exports: [ACTIVITY_MULTIPLE_OPTIONS_PROVIDER, ActivityMultipleOptionsService],
})
export class ActivityMultipleOptionsModule {}
