import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../../database/database.dto';
import { Connection } from 'typeorm';
import { PERMISSIONS_PROVIDER } from './permissions.dto';
import { Permissions } from './permissions.entity';

@Module({
  controllers: [PermissionsController],
  providers: [
    {
      provide: PERMISSIONS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(Permissions),
    },
    PermissionsService,
  ],
  exports: [PERMISSIONS_PROVIDER, PermissionsService],
})
export class PermissionsModule {}
