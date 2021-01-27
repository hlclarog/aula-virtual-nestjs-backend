import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { LESSON_ACTIVITIES_ENTITY } from './lesson_activities.dto';
import { Lessons } from '../lessons/lessons.entity';
import { ActivityTypes } from '../activity_types/activity_types.entity';

@Entity(LESSON_ACTIVITIES_ENTITY)
export class LessonActivities extends Base {
  @Column({ type: 'varchar' })
  description: string;

  @Column('boolean', { default: true })
  visible: boolean;

  @Column('int')
  detail_id: number;

  @ManyToOne(() => Lessons, (lessons) => lessons.lesson_activities)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lessons | number;
  @RelationId((lessonActivities: LessonActivities) => lessonActivities.lesson)
  lesson_id: number;

  @ManyToOne(
    () => ActivityTypes,
    (activityTypes) => activityTypes.lesson_activities,
  )
  @JoinColumn({ name: 'activity_type_id' })
  activity_type: ActivityTypes | number;
  @RelationId(
    (lessonActivities: LessonActivities) => lessonActivities.activity_type,
  )
  activity_type_id: number;
}
