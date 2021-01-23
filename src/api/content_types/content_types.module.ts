import { Module } from '@nestjs/common';
import { ContentTypesService } from './content_types.service';
import { ContentTypesController } from './content_types.controller';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { CONTENT_TYPES_PROVIDER } from './content_types.dto';
import { ContentTypes } from './content_types.entity';

@Module({
  controllers: [ContentTypesController],
  providers: [
    {
      provide: CONTENT_TYPES_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ContentTypes),
    },
    ContentTypesService,
  ],
})
export class ContentTypesModule {}
