import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import { CourseNotes } from './course_notes.entity';
import { BaseRepo } from '../../base/base.repository';
import {
  COURSE_NOTES_PROVIDER,
  CreateCourseNotesDto,
  UpdateCourseNotesDto,
} from './course_notes.dto';

@Injectable()
export class CourseNotesService extends BaseService<
  CourseNotes,
  CreateCourseNotesDto,
  UpdateCourseNotesDto
> {
  @Inject(COURSE_NOTES_PROVIDER) repository: BaseRepo<CourseNotes>;
  constructor() {
    super();
  }

  async findAllForUser(user_id) {
    return await this.repository.find({
      where: { user_id },
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findAllForCourse(user_id, course_id) {
    return await this.repository.find({
      where: { user_id, course_id },
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    return this.repository.findOneOrFail(id);
  }

  async create(createDto: CreateCourseNotesDto) {
    return await this.repository.save(createDto);
  }

  async update(id: number, updateDto: UpdateCourseNotesDto) {
    return await this.repository.update(
      { id, user_id: updateDto.user_id },
      updateDto,
    );
  }

  async removeForUser(id: number, user_id: number) {
    return await this.repository.softDelete({ id, user_id });
  }
}
