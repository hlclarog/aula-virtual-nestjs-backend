import { Base } from '../../base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Users } from '../acl/users/users.entity';
import { PROGRAMS_ENTITY } from './programs.dto';
@Entity({ name: PROGRAMS_ENTITY })
export class Programs extends Base {
  @Column({ type: 'varchar' }) name: string;
  @Column({ type: 'varchar' }) description: string;
  @Column({ type: 'varchar' }) shortname: string;
  @Column({ type: 'varchar' }) picture: string;
  @Column({ type: 'varchar' }) video_url: string;
  @Column({ type: 'int' }) duration: number;
  @Column({ type: 'varchar' }) email_to: string;
  @Column({ type: 'boolean' }) active: boolean;

  @ManyToOne(() => Users, (user) => user.programs, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: Users;
  @RelationId((programs: Programs) => programs.user)
  user_id: number;
}
