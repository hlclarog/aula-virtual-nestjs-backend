import { Module } from '@nestjs/common';
import { ProgramUsersService } from './program_users.service';
import { ProgramUsersController } from './program_users.controller';
import { Connection } from 'typeorm';
import { PROGRAM_USERS_PROVIDER } from './program_users.dto';
import { ProgramUsers } from './program_users.entity';
import { DATABASE_TENANCY_PROVIDER } from './../../database/database.dto';

@Module({
  controllers: [ProgramUsersController],
  providers: [
    {
      provide: PROGRAM_USERS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ProgramUsers),
    },
    ProgramUsersService,
  ],
  exports: [PROGRAM_USERS_PROVIDER, ProgramUsersService],
})
export class ProgramUsersModule {}
