import { Module } from '@nestjs/common';
import { MultipleOptionAnswersService } from './multiple_option_answers.service';
import { MultipleOptionAnswersController } from './multiple_option_answers.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { MULTIPLE_OPTION_ANSWERS_PROVIDER } from './multiple_option_answers.dto';
import { MultipleOptionAnswers } from './multiple_option_answers.entity';

@Module({
  controllers: [MultipleOptionAnswersController],
  providers: [
    {
      provide: MULTIPLE_OPTION_ANSWERS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(MultipleOptionAnswers),
    },
    MultipleOptionAnswersService,
  ],
  exports: [MULTIPLE_OPTION_ANSWERS_PROVIDER, MultipleOptionAnswersService],
})
export class MultipleOptionAnswersModule {}
