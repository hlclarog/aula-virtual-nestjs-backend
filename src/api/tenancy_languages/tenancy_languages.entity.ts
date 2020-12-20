import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Languages } from '../languages/languages.entity';
import { Tenancies } from '../tenancies/tenancies.entity';
import { TENANCY_LANGUAGES_ENTITY } from './tenancy_languages.dto';

@Entity(TENANCY_LANGUAGES_ENTITY)
export class TenancyLanguages extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @ManyToOne(() => Tenancies, (tenancies) => tenancies.tenancy_languages, {
    eager: true,
  })
  tenancy: Tenancies;

  @RelationId(
    (tenancy_languages: TenancyLanguages) => tenancy_languages.tenancy,
  )
  tenancy_id: number;

  @ManyToOne(() => Languages, (languages) => languages.tenancy_languages, {
    eager: true,
  })
  language: Languages;

  @RelationId(
    (tenancy_languages: TenancyLanguages) => tenancy_languages.language,
  )
  language_id: number;
}
