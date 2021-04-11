import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { LESSON_TRY_USERS_ENTITY } from './lesson_try_users.dto';
import { Users } from '../acl/users/users.entity';
import { CourseLessons } from '../course_lessons/course_lessons.entity';

@Entity(LESSON_TRY_USERS_ENTITY)
export class LessonTryUsers extends Base {
  @Column({ type: 'date' }) begin: string;
  @Column({ type: 'date', nullable: true }) end: string;
  @Column({ type: 'integer', nullable: true }) percent: number;

  @ManyToOne(() => Users, (user) => user.lesson_try_users)
  @JoinColumn({ name: 'user_id' })
  user: Users;
  @RelationId((lesson_try_users: LessonTryUsers) => lesson_try_users.user)
  @Column({ type: 'integer' })
  user_id: number;

  @ManyToOne(
    () => CourseLessons,
    (course_lesson) => course_lesson.lesson_try_users,
  )
  @JoinColumn({ name: 'course_lesson_id' })
  course_lesson: CourseLessons;
  @RelationId(
    (lesson_try_users: LessonTryUsers) => lesson_try_users.course_lesson,
  )
  @Column('integer')
  course_lesson_id: number;
}
