import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { EmailTemplates } from '../email_templates/email_templates.entity';
import { LANGUAGES_ENTITY } from './languages.dto';

@Entity(LANGUAGES_ENTITY)
export class Languages extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @Column({ length: 5, type: 'varchar' })
  code: string;

  @OneToMany(() => EmailTemplates, (email_template) => email_template.language)
  templates: EmailTemplates[];
}
