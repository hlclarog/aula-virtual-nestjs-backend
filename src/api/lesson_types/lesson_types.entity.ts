import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Lessons } from '../lessons/lessons.entity';
import { LESSON_TYPES_ENTITY } from './lesson_types.dto';

@Entity({ name: LESSON_TYPES_ENTITY, schema: 'public' })
export class LessonTypes extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @OneToMany(() => Lessons, (lesson) => lesson.lesson_type)
  lessons: Lessons[];
}
