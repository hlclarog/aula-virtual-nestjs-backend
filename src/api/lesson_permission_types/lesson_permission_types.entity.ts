import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Lessons } from '../lessons/lessons.entity';
import { LESSON_PERMISSION_TYPES_ENTITY } from './lesson_permission_types.dto';

@Entity({ name: LESSON_PERMISSION_TYPES_ENTITY, schema: 'public' })
export class LessonPermissionTypes extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @OneToMany(() => Lessons, (lesson) => lesson.lesson_permission_type_id)
  lessons: Lessons[];
}
