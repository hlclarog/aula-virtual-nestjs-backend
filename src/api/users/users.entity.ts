import { Column, Entity } from 'typeorm';
import { Base } from '../../base/base.entity';
import { USERS_ENTITY } from './users.dto';

@Entity(USERS_ENTITY)
export class Users extends Base {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;
}