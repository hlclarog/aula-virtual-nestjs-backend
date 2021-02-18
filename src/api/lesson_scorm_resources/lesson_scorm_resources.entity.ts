import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { LessonScorms } from '../lesson_scorms/lesson_scorms.entity';
import { LESSON_SCORM_RESOURCES_ENTITY } from './lesson_scorm_resources.dto';

@Entity({ name: LESSON_SCORM_RESOURCES_ENTITY })
export class LessonScormResources extends Base {
  @ManyToOne(
    () => LessonScorms,
    (lesson_scorm) => lesson_scorm.lesson_scorm_resources,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'lesson_scorm_id' })
  lesson_scorm: LessonScorms;
  @RelationId(
    (lessonScormResources: LessonScormResources) =>
      lessonScormResources.lesson_scorm,
  )
  @Column('integer')
  lesson_scorm_id: number;

  @Column({ type: 'varchar' }) index: string;
  @Column({ type: 'varchar' }) identifier: string;
}
