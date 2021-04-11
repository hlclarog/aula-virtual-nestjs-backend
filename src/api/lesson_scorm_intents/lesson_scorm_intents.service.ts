import { Inject, Injectable } from '@nestjs/common';
import {
  CreateLessonScormIntentsDto,
  UpdateLessonScormIntentsDto,
  LESSON_SCORM_INTENTS_PROVIDER,
} from './lesson_scorm_intents.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { LessonScormIntents } from './lesson_scorm_intents.entity';
import { LessonScormDetails } from '../lesson_scorm_details/lesson_scorm_details.entity';
import { LESSON_SCORM_DETAILS_PROVIDER } from '../lesson_scorm_details/lesson_scorm_details.dto';

@Injectable()
export class LessonScormIntentsService extends BaseService<
  LessonScormIntents,
  CreateLessonScormIntentsDto,
  UpdateLessonScormIntentsDto
> {
  @Inject(LESSON_SCORM_INTENTS_PROVIDER)
  repository: BaseRepo<LessonScormIntents>;
  @Inject(LESSON_SCORM_DETAILS_PROVIDER)
  repositoryLessonScormDetails: BaseRepo<LessonScormDetails>;

  async findAllByCourseForUser(
    user_id: number,
    course_id: number,
  ): Promise<LessonScormIntents[]> {
    return await this.repository
      .createQueryBuilder('lesson_scorm_intents')
      .leftJoin('lesson_scorm_intents.course_lesson', 'course_lesson')
      .where(
        'course_lesson.course_id = :course_id AND lesson_scorm_intents.user_id = user_id',
        {
          course_id,
          user_id,
        },
      )
      .getMany();
  }

  async resetProgressUser(user_id: number, course_id: number) {
    const intents = await this.findAllByCourseForUser(user_id, course_id);
    for (let i = 0; i < intents.length; i++) {
      const intent = intents[i];
      await this.repositoryLessonScormDetails.delete({
        lesson_scorm_intent_id: intent.id,
      });
      await this.repository.delete(intent.id);
    }
    return { reset: true };
  }
}
