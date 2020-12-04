import { Module } from '@nestjs/common';
import { EmailTemplatesService } from './email_templates.service';
import { EmailTemplatesController } from './email_templates.controller';
import { TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { EMAIL_TEMPLATES_PROVIDER } from './email_templates.dto';
import { EmailTemplates } from './email_templates.entity';

@Module({
  controllers: [EmailTemplatesController],
  providers: [
    {
      provide: EMAIL_TEMPLATES_PROVIDER,
      inject: [TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(EmailTemplates),
    },
    EmailTemplatesService,
  ],
})
export class EmailTemplatesModule {}
