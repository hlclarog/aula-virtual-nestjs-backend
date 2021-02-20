import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { Base } from '../../base/base.entity';
import { Users } from '../acl/users/users.entity';
import { Lessons } from '../lessons/lessons.entity';
import { LessonCommentReactions } from '../lesson_comment_reactions/lesson_comment_reactions.entity';
import { LESSON_DETAILS_ENTITY } from './lesson_comments.dto';

@Entity({ name: LESSON_DETAILS_ENTITY })
@Tree('materialized-path')
export class LessonComments extends Base {
  @ManyToOne(() => Lessons, (lessons) => lessons.lesson_comments)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lessons;
  @RelationId((lessonComments: LessonComments) => lessonComments.lesson)
  @Column('integer')
  lesson_id: number;

  @ManyToOne(() => Users, (user) => user.lesson_comments)
  @JoinColumn({ name: 'user_id' })
  user: Users;
  @RelationId((lessonComments: LessonComments) => lessonComments.user)
  @Column('integer')
  user_id: number;

  @TreeChildren()
  answers: LessonComments[];

  @TreeParent()
  @JoinColumn({ name: 'comment_answer_id' })
  comment_answer: LessonComments;

  @RelationId((lesson_comment: LessonComments) => lesson_comment.comment_answer)
  @Column({ type: 'integer' })
  comment_answer_id: number;

  @Column({ type: 'varchar' }) comment: string;
  @Column({ type: 'varchar' }) content_type: string;
  @Column({ type: 'varchar' }) content: string;
  @Column({ type: 'varchar' }) date: string;

  @OneToMany(
    () => LessonCommentReactions,
    (lesson_comment_reactions) => lesson_comment_reactions.lesson_comment,
  )
  lesson_comment_reactions: LessonCommentReactions[];
}
