import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { EmailActivitiesTemplate } from '../email_activities_template/email_activities_template.entity';
import { EMAIL_ACTIVITIES_ENTITY } from './email_activities.dto';

@Entity(EMAIL_ACTIVITIES_ENTITY)
export class EmailActivities extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @Column({ length: 500, type: 'varchar' })
  observations: string;

  @OneToMany(
    () => EmailActivitiesTemplate,
    (email_template_activity) => email_template_activity.email_activity,
  )
  email_activities_template: EmailActivitiesTemplate[];
}
