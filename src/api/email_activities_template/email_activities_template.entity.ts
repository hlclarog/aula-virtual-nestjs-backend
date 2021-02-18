import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { EmailActivities } from '../email_activities/email_activities.entity';
import { EmailTemplates } from '../email_templates/email_templates.entity';
import { EMAIL_ACTIVITIES_TEMPLATE_ENTITY } from './email_activities_template.dto';

@Entity(EMAIL_ACTIVITIES_TEMPLATE_ENTITY)
export class EmailActivitiesTemplate extends Base {
  @ManyToOne(
    () => EmailTemplates,
    (email_template) => email_template.email_activities_template,
    { eager: true },
  )
  @JoinColumn({ name: 'email_template_id' })
  email_template: EmailTemplates;

  @RelationId(
    (email_activities_template: EmailActivitiesTemplate) =>
      email_activities_template.email_template,
  )
  @Column({ type: 'integer' })
  email_template_id: number;

  @ManyToOne(
    () => EmailActivities,
    (email_activity) => email_activity.email_activities_template,
    { eager: true },
  )
  @JoinColumn({ name: 'email_activity_id' })
  email_activity: EmailActivities;

  @RelationId(
    (email_activities_template: EmailActivitiesTemplate) =>
      email_activities_template.email_activity,
  )
  @Column({ type: 'integer' })
  email_activity_id: number;

  @Column({ type: 'varchar', nullable: true })
  subject?: string;

  @Column({ type: 'varchar', nullable: true })
  body?: string;

  @Column({ type: 'varchar', nullable: true })
  observations?: string;
}
