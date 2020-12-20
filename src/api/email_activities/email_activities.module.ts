import { Module } from '@nestjs/common';
import { EmailActivitiesService } from './email_activities.service';
import { EmailActivitiesController } from './email_activities.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { EMAIL_ACTIVITIES_PROVIDER } from './email_activities.dto';
import { EmailActivities } from './email_activities.entity';

@Module({
  controllers: [EmailActivitiesController],
  providers: [
    {
      provide: EMAIL_ACTIVITIES_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(EmailActivities),
    },
    EmailActivitiesService,
  ],
  exports: [EmailActivitiesService],
})
export class EmailActivitiesModule {}
