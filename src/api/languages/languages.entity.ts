import { Column, Entity } from 'typeorm';
import { Base } from '../../base/base.entity';
import { LANGUAGES_ENTITY } from './languages.dto';

@Entity(LANGUAGES_ENTITY)
export class Languages extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @Column({ length: 5, type: 'varchar' })
  code: string;
}
