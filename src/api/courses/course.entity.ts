import { Base } from '../../base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Organizations } from '../organizations/organizations.entity';
import { COURSE_ENTITY } from './courses.dto';
@Entity({ name: COURSE_ENTITY })
export class Course extends Base {
  @Column({ type: 'varchar' }) name: string;
  @Column({ type: 'varchar' }) description: string;
  @Column({ type: 'varchar' }) short_name: string;
  @Column({ type: 'boolean' }) free: string;
  @Column({ type: 'boolean' }) certificable: string;
  @ManyToOne(() => Organizations, (organization) => organization.course, {
    eager: true,
  })
  @JoinColumn({ name: 'organization_id' })
  organization: Organizations;

  @RelationId((course: Course) => course.organization)
  organization_id: number;
}
