import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../../database/database.dto';
import { Connection } from 'typeorm';
import { ROLES_PROVIDER } from './roles.dto';
import { Roles } from './roles.entity';
import { RolesPermissionsModule } from '../roles_permissions/roles_permissions.module';
import { ModulesModule } from '../modules/modules.module';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  imports: [RolesPermissionsModule, ModulesModule, PermissionsModule],
  controllers: [RolesController],
  providers: [
    {
      provide: ROLES_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) => connection.getRepository(Roles),
    },
    RolesService,
  ],
  exports: [RolesService],
})
export class RolesModule {}
