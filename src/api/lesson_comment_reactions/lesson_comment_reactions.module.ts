import { Module } from '@nestjs/common';
import { LessonCommentReactionsService } from './lesson_comment_reactions.service';
import { LessonCommentReactionsController } from './lesson_comment_reactions.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { LESSON_DETAILS_PROVIDER } from './lesson_comment_reactions.dto';
import { LessonCommentReactions } from './lesson_comment_reactions.entity';
import { AwsModule } from './../../aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [LessonCommentReactionsController],
  providers: [
    {
      provide: LESSON_DETAILS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(LessonCommentReactions),
    },
    LessonCommentReactionsService,
  ],
})
export class LessonCommentReactionsModule {}
