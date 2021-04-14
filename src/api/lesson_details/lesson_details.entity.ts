import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { ContentTypes } from '../content_types/content_types.entity';
import { Lessons } from '../lessons/lessons.entity';
import { LESSON_DETAILS_ENTITY } from './lesson_details.dto';

@Entity({ name: LESSON_DETAILS_ENTITY })
export class LessonDetails extends Base {
  @ManyToOne(() => Lessons, (lesson) => lesson.lesson_details)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lessons;
  @RelationId((lessonDetails: LessonDetails) => lessonDetails.lesson)
  @Column('integer')
  lesson_id: number;

  @ManyToOne(() => ContentTypes, (content_type) => content_type.lesson_details)
  @JoinColumn({ name: 'content_type_id' })
  content_type: ContentTypes;
  @RelationId((lessonDetails: LessonDetails) => lessonDetails.content_type)
  @Column('integer')
  content_type_id: number;

  @Column({ type: 'varchar' }) content: string;
  @Column({ type: 'varchar' }) description: string;
  @Column({ type: 'int' }) order: number;
  @Column({ type: 'boolean', default: true }) visible: boolean;
}
