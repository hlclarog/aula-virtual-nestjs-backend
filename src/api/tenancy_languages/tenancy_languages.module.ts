import { Module } from '@nestjs/common';
import { TenancyLanguagesService } from './tenancy_languages.service';
import { TenancyLanguagesController } from './tenancy_languages.controller';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { TENANCY_LANGUAGES_PROVIDER } from './tenancy_languages.dto';
import { TenancyLanguages } from './tenancy_languages.entity';

@Module({
  controllers: [TenancyLanguagesController],
  providers: [
    {
      provide: TENANCY_LANGUAGES_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(TenancyLanguages),
    },
    TenancyLanguagesService,
  ],
})
export class TenancyLanguagesModule {}
