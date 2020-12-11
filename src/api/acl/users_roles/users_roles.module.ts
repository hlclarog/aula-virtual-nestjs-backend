import { Module } from '@nestjs/common';
import { UsersRolesService } from './users_roles.service';
import { UsersRolesController } from './users_roles.controller';
import { TENANCY_PROVIDER } from '../../../database/database.dto';
import { Connection } from 'typeorm';
import { USERS_ROLES_PROVIDER } from './users_roles.dto';
import { UsersRoles } from './users_roles.entity';

@Module({
  controllers: [UsersRolesController],
  providers: [
    {
      provide: USERS_ROLES_PROVIDER,
      inject: [TENANCY_PROVIDER],
      useFactory: (connection: Connection) => connection.getRepository(UsersRoles),
    },
    UsersRolesService,
  ],
  exports: [UsersRolesService],
})
export class UsersRolesModule {}
