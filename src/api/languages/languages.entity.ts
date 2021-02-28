import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Users } from '../acl/users/users.entity';
import { EmailTemplates } from '../email_templates/email_templates.entity';
import { TenancyLanguages } from '../tenancy_languages/tenancy_languages.entity';
import { LANGUAGES_ENTITY } from './languages.dto';

@Entity({ name: LANGUAGES_ENTITY, schema: 'public' })
export class Languages extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @Column({ length: 5, type: 'varchar' })
  code: string;

  @OneToMany(() => EmailTemplates, (email_template) => email_template.language)
  templates: EmailTemplates[];

  @OneToMany(
    () => TenancyLanguages,
    (tenancy_languages) => tenancy_languages.language,
  )
  tenancy_languages: TenancyLanguages[];

  @OneToMany(() => Users, (user) => user.language)
  users: Users[];
}
