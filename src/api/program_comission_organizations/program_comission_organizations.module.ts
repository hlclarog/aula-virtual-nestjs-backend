import { Module } from '@nestjs/common';
import { ProgramComissionOrganizationsService } from './program_comission_organizations.service';
import { ProgramComissionOrganizationsController } from './program_comission_organizations.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { PROGRAM_STATUS_PROVIDER } from './program_comission_organizations.dto';
import { ProgramComissionOrganizations } from './program_comission_organizations.entity';

@Module({
  controllers: [ProgramComissionOrganizationsController],
  providers: [
    {
      provide: PROGRAM_STATUS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ProgramComissionOrganizations),
    },
    ProgramComissionOrganizationsService,
  ],
})
export class ProgramComissionOrganizationsModule {}
