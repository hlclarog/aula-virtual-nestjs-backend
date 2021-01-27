import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../../database/database.dto';
import { Connection } from 'typeorm';
import { USERS_PROVIDER } from './users.dto';
import { Users } from './users.entity';
import { CryptoService } from '../../../utils/services/crypto.service';
import { UsersRolesModule } from '../users_roles/users_roles.module';
import { AwsModule } from './../../../aws/aws.module';

@Module({
  imports: [UsersRolesModule, AwsModule],
  controllers: [UsersController],
  providers: [
    {
      provide: USERS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) => connection.getRepository(Users),
    },
    UsersService,
    CryptoService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
