import { Module } from '@nestjs/common';
import { UsersCompetencesService } from './users_competences.service';
import { UsersCompetencesController } from './users_competences.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { USERS_COMPETENCES_PROVIDER } from './users_competences.dto';
import { UsersCompetences } from './users_competences.entity';

@Module({
  controllers: [UsersCompetencesController],
  providers: [
    {
      provide: USERS_COMPETENCES_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(UsersCompetences),
    },
    UsersCompetencesService,
  ],
  exports: [USERS_COMPETENCES_PROVIDER, UsersCompetencesService],
})
export class UsersCompetencesModule {}
