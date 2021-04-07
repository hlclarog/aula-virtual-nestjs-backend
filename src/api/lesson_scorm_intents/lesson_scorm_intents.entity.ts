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
import { CourseLessons } from '../course_lessons/course_lessons.entity';
import { LessonScormDetails } from '../lesson_scorm_details/lesson_scorm_details.entity';
import { LESSON_SCORM_INTENTS_ENTITY } from './lesson_scorm_intents.dto';

@Entity({ name: LESSON_SCORM_INTENTS_ENTITY })
export class LessonScormIntents extends Base {
  @ManyToOne(
    () => CourseLessons,
    (course_lesson) => course_lesson.lesson_scorm_intents,
  )
  @JoinColumn({ name: 'course_lesson_id' })
  course_lesson: CourseLessons;
  @RelationId(
    (lessonScormIntents: LessonScormIntents) =>
      lessonScormIntents.course_lesson,
  )
  @Column('integer')
  course_lesson_id: number;

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
