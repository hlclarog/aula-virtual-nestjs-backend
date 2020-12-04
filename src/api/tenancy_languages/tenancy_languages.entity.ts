import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Languages } from '../languages/languages.entity';
import { Tenancies } from '../tenancies/tenancies.entity';
import { TENANCY_LANGUAGES_ENTITY } from './tenancy_languages.dto';

@Entity(TENANCY_LANGUAGES_ENTITY)
export class TenancyLanguages extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @ManyToOne(() => Tenancies, (tenancies) => tenancies.languages, {
    eager: true,
  })
  tenancy: Tenancies[];

  @ManyToOne(() => Languages, (languages) => languages.tenancy_languages, {
    eager: true,
  })
  language: Languages[];
}
