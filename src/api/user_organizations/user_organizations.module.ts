import { Module } from '@nestjs/common';
import { UserOrganizationsService } from './user_organizations.service';
import { UserOrganizationsController } from './user_organizations.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { USER_ORGANIZATIONS_PROVIDER } from './user_organizations.dto';
import { UserOrganizations } from './user_organizations.entity';
import { AwsModule } from './../../aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [UserOrganizationsController],
  providers: [
    {
      provide: USER_ORGANIZATIONS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(UserOrganizations),
    },
    UserOrganizationsService,
  ],
  exports: [USER_ORGANIZATIONS_PROVIDER, UserOrganizationsService],
})
export class UserOrganizationsModule {}
