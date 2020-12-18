import { Module } from '@nestjs/common';
import { RolesPermissionsService } from './roles_permissions.service';
import { RolesPermissionsController } from './roles_permissions.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../../database/database.dto';
import { Connection } from 'typeorm';
import { ROLES_PERMISSIONS_PROVIDER } from './roles_permissions.dto';
import { RolesPermissions } from './roles_permissions.entity';

@Module({
  controllers: [RolesPermissionsController],
  providers: [
    {
      provide: ROLES_PERMISSIONS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(RolesPermissions),
    },
    RolesPermissionsService,
  ],
  exports: [RolesPermissionsService],
})
export class RolesPermissionsModule {}
