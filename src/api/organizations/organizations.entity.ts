import { Column, Entity } from 'typeorm';
import { Base } from '../../base/base.entity';
import { ORGANIZATIONS_ENTITY } from './organizations.dto';

@Entity({ name: ORGANIZATIONS_ENTITY })
export class Organizations extends Base {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  short_name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'varchar' })
  primary_color: string;

  @Column({ type: 'varchar' })
  seconday_color: string;

  @Column({ type: 'varchar' })
  tertiary_color: string;
}
