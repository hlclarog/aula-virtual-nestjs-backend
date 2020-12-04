import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../base/base.entity';
import { EmailActivities } from '../email_activities/email_activities.entity';
import { EmailTemplates } from '../email_templates/email_templates.entity';
import { EMAIL_ACTIVITIES_TEMPLATE_ENTITY } from './email_activities_template.dto';

@Entity(EMAIL_ACTIVITIES_TEMPLATE_ENTITY)
export class EmailActivitiesTemplate extends Base {
  @ManyToOne(
    () => EmailTemplates,
    (email_template) => email_template.activities,
    { eager: true },
  )
  email_template: EmailTemplates;

  @ManyToOne(
    () => EmailActivities,
    (email_activity) => email_activity.templates,
    { eager: true },
  )
  email_activity: EmailActivities;

  @Column({ length: 500, type: 'varchar' })
  subject: string;

  @Column({ length: 500, type: 'varchar' })
  body: string;

  @Column({ length: 500, type: 'varchar' })
  observations: string;
}
