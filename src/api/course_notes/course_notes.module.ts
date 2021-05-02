import { Module } from '@nestjs/common';
import { CourseNotesService } from './course_notes.service';
import { CourseNotesController } from './course_notes.controller';
import { Connection } from 'typeorm';
import { COURSE_NOTES_PROVIDER } from './course_notes.dto';
import { CourseNotes } from './course_notes.entity';
import { DATABASE_TENANCY_PROVIDER } from './../../database/database.dto';

@Module({
  imports: [],
  controllers: [CourseNotesController],
  providers: [
    {
      provide: COURSE_NOTES_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(CourseNotes),
    },
    CourseNotesService,
  ],
  exports: [COURSE_NOTES_PROVIDER, CourseNotesService],
})
export class CourseNotesModule {}
