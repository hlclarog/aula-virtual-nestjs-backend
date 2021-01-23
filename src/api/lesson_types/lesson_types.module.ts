import { Module } from '@nestjs/common';
import { LessonTypesService } from './lesson_types.service';
import { LessonTypesController } from './lesson_types.controller';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { LESSON_TYPES_PROVIDER } from './lesson_types.dto';
import { LessonTypes } from './lesson_types.entity';

@Module({
  controllers: [LessonTypesController],
  providers: [
    {
      provide: LESSON_TYPES_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(LessonTypes),
    },
    LessonTypesService,
  ],
})
export class LessonTypesModule {}
