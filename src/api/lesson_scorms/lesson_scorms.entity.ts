import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Base } from '../../base/base.entity';
import { Lessons } from '../lessons/lessons.entity';
import { LessonScormResources } from '../lesson_scorm_resources/lesson_scorm_resources.entity';
import { LESSON_SCORMS_ENTITY } from './lesson_scorms.dto';

@Entity({ name: LESSON_SCORMS_ENTITY })
export class LessonScorms extends Base {
  @ManyToOne(() => Lessons, (lessons) => lessons.lesson_scorms, {
    eager: true,
  })
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lessons;
  @RelationId((lessonScorms: LessonScorms) => lessonScorms.lesson)
  @Column('integer')
  lesson_id: number;

  @Column({ type: 'varchar' }) content: string;
  @Column({ type: 'varchar' }) identifier: string;
  @Column({ type: 'varchar' }) title: string;

  @OneToMany(
    () => LessonScormResources,
    (lesson_scorm_resource) => lesson_scorm_resource.lesson_scorm,
  )
  lesson_scorm_resources: LessonScormResources[];
}
