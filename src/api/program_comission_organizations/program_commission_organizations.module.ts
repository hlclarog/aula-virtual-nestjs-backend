import { Module } from '@nestjs/common';
import { PROGRAM_COMMISSION_ORGANIZATIONS_PROVIDER } from './program_commission_organizations.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { ProgramCommissionOrganizationsService } from './program_commission_organizations.service';
import { ProgramCommissionOrganizations } from './program_commission_organizations.entity';
import { ProgramCommissionOrganizationsController } from './program_commission_organizations.controller';

@Module({
  controllers: [ProgramCommissionOrganizationsController],
  providers: [
    {
      provide: PROGRAM_COMMISSION_ORGANIZATIONS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ProgramCommissionOrganizations),
    },
    ProgramCommissionOrganizationsService,
  ],
})
export class ProgramCommissionOrganizationsModule {}
