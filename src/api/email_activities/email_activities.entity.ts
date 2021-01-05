import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { EmailActivitiesTemplate } from '../email_activities_template/email_activities_template.entity';
import { EMAIL_ACTIVITIES_ENTITY } from './email_activities.dto';

@Entity({ name: EMAIL_ACTIVITIES_ENTITY, schema: 'public' })
export class EmailActivities extends Base {
  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  observations: string;

  @OneToMany(
    () => EmailActivitiesTemplate,
    (email_template_activity) => email_template_activity.email_activity,
  )
  email_activities_template: EmailActivitiesTemplate[];
}
