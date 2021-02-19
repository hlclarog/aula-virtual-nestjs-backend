import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Base } from '../../base/base.entity';
import { Users } from '../acl/users/users.entity';
import { Lessons } from '../lessons/lessons.entity';
import { LessonScormDetails } from '../lesson_scorm_details/lesson_scorm_details.entity';
import { LESSON_SCORM_INTENTS_ENTITY } from './lesson_scorm_intents.dto';

@Entity({ name: LESSON_SCORM_INTENTS_ENTITY })
export class LessonScormIntents extends Base {
  @ManyToOne(() => Lessons, (lessons) => lessons.lesson_scorm_intents)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lessons;
  @RelationId(
    (lessonScormIntents: LessonScormIntents) => lessonScormIntents.lesson,
  )
  @Column('integer')
  lesson_id: number;

  @ManyToOne(() => Users, (user) => user.lesson_scorm_intents)
  @JoinColumn({ name: 'user_id' })
  user: Users;
  @RelationId((userScormIntents: LessonScormIntents) => userScormIntents.user)
  @Column('integer')
  user_id: number;

  @OneToMany(
    () => LessonScormDetails,
    (lesson_scorm_detail) => lesson_scorm_detail.lesson_scorm_intent,
  )
  lesson_scorm_details: LessonScormDetails[];
}
