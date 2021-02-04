import { Module } from '@nestjs/common';
import { RelateElementAnswersService } from './relate_element_answers.service';
import { RelateElementAnswersController } from './relate_element_answers.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { RELATE_ELEMENT_ANSWERS_PROVIDER } from './relate_element_answers.dto';
import { RelateElementAnswers } from './relate_element_answers.entity';

@Module({
  controllers: [RelateElementAnswersController],
  providers: [
    {
      provide: RELATE_ELEMENT_ANSWERS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(RelateElementAnswers),
    },
    RelateElementAnswersService,
  ],
  exports: [RELATE_ELEMENT_ANSWERS_PROVIDER, RelateElementAnswersService],
})
export class RelateElementAnswersModule {}
