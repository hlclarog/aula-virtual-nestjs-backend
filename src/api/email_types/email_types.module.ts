import { Module } from '@nestjs/common';
import { EmailTypesService } from './email_types.service';
import { EmailTypesController } from './email_types.controller';
import { TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { EMAIL_TYPES_PROVIDER } from './email_types.dto';
import { EmailTypes } from './email_types.entity';

@Module({
  controllers: [EmailTypesController],
  providers: [
    {
      provide: EMAIL_TYPES_PROVIDER,
      inject: [TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(EmailTypes),
    },
    EmailTypesService,
  ],
})
export class EmailTypesModule {}
