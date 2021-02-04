import { Module } from '@nestjs/common';
import { ActivityIdentifyWordsService } from './activity_identify_words.service';
import { ActivityIdentifyWordsController } from './activity_identify_words.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { ACTIVITY_IDENTIFY_WORDS_PROVIDER } from './activity_identify_words.dto';
import { ActivityIdentifyWords } from './activity_identify_words.entity';

@Module({
  controllers: [ActivityIdentifyWordsController],
  providers: [
    {
      provide: ACTIVITY_IDENTIFY_WORDS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ActivityIdentifyWords),
    },
    ActivityIdentifyWordsService,
  ],
})
export class ActivityIdentifyWordsModule {}
