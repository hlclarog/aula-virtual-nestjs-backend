import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Users } from '../acl/users/users.entity';
import { LessonComments } from '../lesson_comments/lesson_comments.entity';
import { LESSON_DETAILS_ENTITY } from './lesson_comment_reactions.dto';

@Entity({ name: LESSON_DETAILS_ENTITY })
export class LessonCommentReactions extends Base {
  @ManyToOne(
    () => LessonComments,
    (lesson_comment) => lesson_comment.lesson_comment_reactions,
  )
  @JoinColumn({ name: 'lesson_comment_id' })
  lesson_comment: LessonComments;
  @RelationId(
    (lessonCommentReactions: LessonCommentReactions) =>
      lessonCommentReactions.lesson_comment,
  )
  @Column('integer')
  lesson_comment_id: number;

  @ManyToOne(() => Users, (user) => user.lesson_comment_reactions)
  @JoinColumn({ name: 'user_id' })
  user: Users;
  @RelationId(
    (lessonCommentReactions: LessonCommentReactions) =>
      lessonCommentReactions.user,
  )
  @Column('integer')
  user_id: number;

  @Column({ type: 'varchar' }) reaction_type: string;
}
