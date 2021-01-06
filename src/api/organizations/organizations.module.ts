import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { ORGANIZATIONS_PROVIDER } from './organizations.dto';
import { Organizations } from './organizations.entity';
import { InstanceProcessModule } from '../../queues/instance_process/instance_process.module';

@Module({
  imports: [InstanceProcessModule],
  controllers: [OrganizationsController],
  providers: [
    {
      provide: ORGANIZATIONS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(Organizations),
    },
    OrganizationsService,
  ],
})
export class OrganizationsModule {}
