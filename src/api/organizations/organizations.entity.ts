import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { ORGANIZATIONS_ENTITY } from './organizations.dto';
import { Programs } from '../programs/programs.entity';
import { Courses } from '../courses/courses.entity';

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
  secondary_color: string;

  @Column({ type: 'varchar' })
  tertiary_color: string;

  @OneToMany(() => Courses, (courses) => courses.organization)
  course: Courses[];

  @OneToMany(() => Programs, (program) => program.organization)
  programs: Programs[];
}
