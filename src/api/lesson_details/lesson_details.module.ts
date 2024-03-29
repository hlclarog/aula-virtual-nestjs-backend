import { Module } from '@nestjs/common';
import { LessonDetailsService } from './lesson_details.service';
import { LessonDetailsController } from './lesson_details.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { LESSON_DETAILS_PROVIDER } from './lesson_details.dto';
import { LessonDetails } from './lesson_details.entity';
import { AwsModule } from './../../aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [LessonDetailsController],
  providers: [
    {
      provide: LESSON_DETAILS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(LessonDetails),
    },
    LessonDetailsService,
  ],
  exports: [LESSON_DETAILS_PROVIDER, LessonDetailsService],
})
export class LessonDetailsModule {}
