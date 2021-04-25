import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Positions } from '../positions/positions.entity';
import { DEPENDENCIES_ENTITY } from './dependencies.dto';

@Entity({ name: DEPENDENCIES_ENTITY })
export class Dependencies extends Base {
  @Column({ type: 'varchar' }) name: string;
  @Column({ type: 'varchar' }) description: string;

  @OneToMany(() => Positions, (position) => position.dependency)
  positions: Positions[];
}
