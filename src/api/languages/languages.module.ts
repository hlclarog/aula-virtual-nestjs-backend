import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { LANGUAGES_PROVIDER } from './languages.dto';
import { Languages } from './languages.entity';

@Module({
  controllers: [LanguagesController],
  providers: [
    {
      provide: LANGUAGES_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(Languages),
    },
    LanguagesService,
  ],
})
export class LanguagesModule {}
