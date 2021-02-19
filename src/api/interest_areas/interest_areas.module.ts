import { forwardRef, Module } from '@nestjs/common';
import { InterestAreasService } from './interest_areas.service';
import { InterestAreasController } from './interest_areas.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { INTEREST_AREAS_PROVIDER } from './interest_areas.dto';
import { InterestAreas } from './interest_areas.entity';
import { AwsModule } from './../../aws/aws.module';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [AwsModule, forwardRef(() => CoursesModule)],
  controllers: [InterestAreasController],
  providers: [
    {
      provide: INTEREST_AREAS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(InterestAreas),
    },
    InterestAreasService,
  ],
  exports: [INTEREST_AREAS_PROVIDER, InterestAreasService],
})
export class InterestAreasModule {}
