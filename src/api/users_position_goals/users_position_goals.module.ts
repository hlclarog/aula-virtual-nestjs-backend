import { Module } from '@nestjs/common';
import { UsersPositionGoalsService } from './users_position_goals.service';
import { UsersPositionGoalsController } from './users_position_goals.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { USERS_POSITION_GOALS_PROVIDER } from './users_position_goals.dto';
import { UsersPositionGoals } from './users_position_goals.entity';

@Module({
  controllers: [UsersPositionGoalsController],
  providers: [
    {
      provide: USERS_POSITION_GOALS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(UsersPositionGoals),
    },
    UsersPositionGoalsService,
  ],
  exports: [USERS_POSITION_GOALS_PROVIDER, UsersPositionGoalsService],
})
export class UsersPositionGoalsModule {}
