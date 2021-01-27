import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { ACTIVITY_TYPES_ENTITY } from './activity_types.dto';
import { LessonActivities } from '../lesson_activities/lesson_activities.entity';

@Entity({ name: ACTIVITY_TYPES_ENTITY, schema: 'public' })
export class ActivityTypes extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @OneToMany(
    () => LessonActivities,
    (lesson_activities) => lesson_activities.activity_type,
  )
  lesson_activities: LessonActivities[];
}
