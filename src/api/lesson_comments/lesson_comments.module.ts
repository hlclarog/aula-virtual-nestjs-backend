import { Module } from '@nestjs/common';
import { LessonCommentsService } from './lesson_comments.service';
import { LessonCommentsController } from './lesson_comments.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { LESSON_DETAILS_PROVIDER } from './lesson_comments.dto';
import { LessonComments } from './lesson_comments.entity';
import { AwsModule } from './../../aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [LessonCommentsController],
  providers: [
    {
      provide: LESSON_DETAILS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(LessonComments),
    },
    LessonCommentsService,
  ],
})
export class LessonCommentsModule {}
