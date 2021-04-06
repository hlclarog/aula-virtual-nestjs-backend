import { Module } from '@nestjs/common';
import { LessonPermissionTypesService } from './lesson_permission_types.service';
import { LessonPermissionTypesController } from './lesson_permission_types.controller';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { LESSON_PERMISSION_TYPES_PROVIDER } from './lesson_permission_types.dto';
import { LessonPermissionTypes } from './lesson_permission_types.entity';

@Module({
  controllers: [LessonPermissionTypesController],
  providers: [
    {
      provide: LESSON_PERMISSION_TYPES_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(LessonPermissionTypes),
    },
    LessonPermissionTypesService,
  ],
  exports: [LESSON_PERMISSION_TYPES_PROVIDER, LessonPermissionTypesService],
})
export class LessonPermissionTypesModule {}
