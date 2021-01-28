import { LessonsController } from './lessons.controller';
import { Module } from '@nestjs/common';
import { COURSE_UNITS_PROVIDER } from './lessons.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { Lessons } from './lessons.entity';
import { LessonsService } from './lessons.service';
import { AwsModule } from './../../aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [LessonsController],
  providers: [
    {
      provide: COURSE_UNITS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) => connection.getRepository(Lessons),
    },
    LessonsService,
  ],
})
export class LessonsModule {}
