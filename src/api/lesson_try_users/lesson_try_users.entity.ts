import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { ACTIVITY_TRY_USERS_ENTITY } from './lesson_try_users.dto';
import { Users } from '../acl/users/users.entity';
import { Lessons } from '../lessons/lessons.entity';

@Entity(ACTIVITY_TRY_USERS_ENTITY)
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

  @ManyToOne(() => Lessons, (lesson) => lesson.lesson_try_users)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lessons;
  @RelationId((lesson_try_users: LessonTryUsers) => lesson_try_users.lesson)
  @Column({ type: 'integer' })
  lesson_id: number;
}
