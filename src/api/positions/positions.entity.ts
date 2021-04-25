import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Base } from '../../base/base.entity';
import { Dependencies } from '../dependencies/dependencies.entity';
import { PositionCompetences } from '../position_competences/position_competences.entity';
import { UsersPositionGoals } from '../users_position_goals/users_position_goals.entity';
import { POSITIONS_ENTITY } from './positions.dto';

@Entity({ name: POSITIONS_ENTITY })
export class Positions extends Base {
  @Column({ type: 'varchar' }) name: string;
  @Column({ type: 'varchar' }) description: string;

  @ManyToOne(() => Dependencies, (depedency) => depedency.positions)
  @JoinColumn({ name: 'dependency_id' })
  dependency: Dependencies;
  @RelationId((position: Positions) => position.dependency)
  @Column({ type: 'integer' })
  dependency_id: number;

  @OneToMany(
    () => PositionCompetences,
    (positionCompetences) => positionCompetences.position,
  )
  position_competences: PositionCompetences[];

  @OneToMany(
    () => UsersPositionGoals,
    (usersCompetences) => usersCompetences.position,
  )
  users_position_goals: UsersPositionGoals[];
}
