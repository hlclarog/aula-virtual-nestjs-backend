import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { EmailActivitiesTemplate } from '../email_activities_template/email_activities_template.entity';
import { Languages } from '../languages/languages.entity';
import { EMAIL_TEMPLATES_ENTITY } from './email_templates.dto';

@Entity(EMAIL_TEMPLATES_ENTITY)
export class EmailTemplates extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @Column({ length: 500, type: 'varchar' })
  observations: string;

  @ManyToOne(() => Languages, (language) => language.templates, { eager: true })
  language: Languages;

  @RelationId((email_templates: EmailTemplates) => email_templates.language)
  language_id: number;

  @OneToMany(
    () => EmailActivitiesTemplate,
    (email_template_activity) => email_template_activity.email_template,
  )
  activities: EmailActivitiesTemplate[];
}
