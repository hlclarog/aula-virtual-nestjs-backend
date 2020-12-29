import { Module } from '@nestjs/common';
import { TenancyEmailsService } from './tenancy_emails.service';
import { TenancyEmailsController } from './tenancy_emails.controller';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { TENANCY_EMAILS_PROVIDER } from './tenancy_emails.dto';
import { TenancyEmails } from './tenancy_emails.entity';

@Module({
  controllers: [TenancyEmailsController],
  providers: [
    {
      provide: TENANCY_EMAILS_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(TenancyEmails),
    },
    TenancyEmailsService,
  ],
})
export class TenancyEmailsModule {}
