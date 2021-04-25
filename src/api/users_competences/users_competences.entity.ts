import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Users } from '../acl/users/users.entity';
import { Competence } from '../competences/competence.entity';
import { USERS_COMPETENCES_ENTITY } from './users_competences.dto';

@Entity({ name: USERS_COMPETENCES_ENTITY })
export class UsersCompetences extends Base {
  @ManyToOne(() => Users, (user) => user.users_competences)
  @JoinColumn({ name: 'user_id' })
  user: Users;
  @RelationId((usersCompetences: UsersCompetences) => usersCompetences.user)
  @Column('integer')
  user_id: number;

  @ManyToOne(() => Competence, (competence) => competence.users_competences)
  @JoinColumn({ name: 'competence_id' })
  competence: Competence;
  @RelationId(
    (usersCompetences: UsersCompetences) => usersCompetences.competence,
  )
  @Column('integer')
  competence_id: number;
}
