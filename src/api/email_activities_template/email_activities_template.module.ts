import { Module } from '@nestjs/common';
import { EmailActivitiesTemplateService } from './email_activities_template.service';
import { EmailActivitiesTemplateController } from './email_activities_template.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { EMAIL_ACTIVITIES_TEMPLATE_PROVIDER } from './email_activities_template.dto';
import { EmailActivitiesTemplate } from './email_activities_template.entity';
import { TenancyConfigModule } from '../tenancy_config/tenancy_config.module';

@Module({
  imports: [TenancyConfigModule],
  controllers: [EmailActivitiesTemplateController],
  providers: [
    {
      provide: EMAIL_ACTIVITIES_TEMPLATE_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(EmailActivitiesTemplate),
    },
    EmailActivitiesTemplateService,
  ],
  exports: [EmailActivitiesTemplateService],
})
export class EmailActivitiesTemplateModule {}
