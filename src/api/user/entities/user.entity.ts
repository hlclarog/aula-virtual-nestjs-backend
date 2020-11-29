import { Column, Entity } from 'typeorm';
import { Base } from '../../../base/base.entity';

@Entity()
export class User extends Base {
  @Column({ length: 500 })
  full_name: string;

  @Column('text')
  description: string;

  @Column('int')
  state: number;
}
