import { Module } from '@nestjs/common';
import { EmailTemplatesService } from './email_templates.service';
import { EmailTemplatesController } from './email_templates.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { EMAIL_TEMPLATES_PROVIDER } from './email_templates.dto';
import { EmailTemplates } from './email_templates.entity';
import { EmailActivitiesTemplateModule } from '../email_activities_template/email_activities_template.module';
import { EmailActivitiesModule } from '../email_activities/email_activities.module';

@Module({
  imports: [EmailActivitiesTemplateModule, EmailActivitiesModule],
  controllers: [EmailTemplatesController],
  providers: [
    {
      provide: EMAIL_TEMPLATES_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(EmailTemplates),
    },
    EmailTemplatesService,
  ],
})
export class EmailTemplatesModule {}
