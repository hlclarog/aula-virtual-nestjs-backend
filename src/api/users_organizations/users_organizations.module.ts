import { Module } from '@nestjs/common';
import { UsersOrganizationsService } from './users_organizations.service';
import { UsersOrganizationsController } from './users_organizations.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { USERS_ORGANIZATIONS_PROVIDER } from './users_organizations.dto';
import { UsersOrganizations } from './users_organizations.entity';

@Module({
  controllers: [UsersOrganizationsController],
  providers: [
    {
      provide: USERS_ORGANIZATIONS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(UsersOrganizations),
    },
    UsersOrganizationsService,
  ],
  exports: [USERS_ORGANIZATIONS_PROVIDER, UsersOrganizationsService],
})
export class UsersOrganizationsModule {}
