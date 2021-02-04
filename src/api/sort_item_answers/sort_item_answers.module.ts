import { Module } from '@nestjs/common';
import { SortItemAnswersService } from './sort_item_answers.service';
import { SortItemAnswersController } from './sort_item_answers.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { SORT_ITEM_ANSWERS_PROVIDER } from './sort_item_answers.dto';
import { SortItemAnswers } from './sort_item_answers.entity';

@Module({
  controllers: [SortItemAnswersController],
  providers: [
    {
      provide: SORT_ITEM_ANSWERS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(SortItemAnswers),
    },
    SortItemAnswersService,
  ],
  exports: [SORT_ITEM_ANSWERS_PROVIDER, SortItemAnswersService],
})
export class SortItemAnswersModule {}
