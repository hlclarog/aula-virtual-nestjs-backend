import { Module } from '@nestjs/common';
import { DependenciesService } from './dependencies.service';
import { DependenciesController } from './dependencies.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { DEPENDENCIES_PROVIDER } from './dependencies.dto';
import { Dependencies } from './dependencies.entity';

@Module({
  imports: [],
  controllers: [DependenciesController],
  providers: [
    {
      provide: DEPENDENCIES_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(Dependencies),
    },
    DependenciesService,
  ],
  exports: [DEPENDENCIES_PROVIDER, DependenciesService],
})
export class DependenciesModule {}
