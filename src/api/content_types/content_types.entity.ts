import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { LessonDetails } from '../lesson_details/lesson_details.entity';
import { CONTENT_TYPES_ENTITY } from './content_types.dto';

@Entity({ name: CONTENT_TYPES_ENTITY, schema: 'public' })
export class ContentTypes extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @OneToMany(() => LessonDetails, (lesson_detail) => lesson_detail.content_type)
  lesson_details: LessonDetails[];
}
