import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { LessonScormIntents } from '../lesson_scorm_intents/lesson_scorm_intents.entity';
import { LESSON_SCORM_DETAILS_ENTITY } from './lesson_scorm_details.dto';

@Entity({ name: LESSON_SCORM_DETAILS_ENTITY })
export class LessonScormDetails extends Base {
  @ManyToOne(
    () => LessonScormIntents,
    (lesson_scorm_intent) => lesson_scorm_intent.lesson_scorm_details,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'lesson_scorm_intent_id' })
  lesson_scorm_intent: LessonScormIntents | number;
  @RelationId(
    (lessonScormDetails: LessonScormDetails) =>
      lessonScormDetails.lesson_scorm_intent,
  )
  lesson_scorm_intent_id: number;

  @Column({ type: 'varchar' }) key: string;
  @Column({ type: 'varchar' }) value: string;
}