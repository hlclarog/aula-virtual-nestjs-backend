import { Base } from '../../base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Organizations } from '../organizations/organizations.entity';
import { COURSE_ENTITY } from './courses.dto';
import { Users } from '../acl/users/users.entity';
import { CourseStatus } from '../course-status/course-status.entity';
@Entity({ name: COURSE_ENTITY })
export class Course extends Base {
  @Column({ type: 'varchar' }) name: string;
  @Column({ type: 'varchar' }) description: string;
  @Column({ type: 'varchar' }) short_name: string;
  @Column({ type: 'boolean' }) free: string;
  @Column({ type: 'boolean' }) certificable: string;

  /**
   * Relation with Users
   */
  @ManyToOne(() => Users, (user) => user.course, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: Users;
  @RelationId((course: Course) => course.user)
  @Column({ type: 'int' })
  user_id: number;
  /**
   * Relation with Organization
   */
  @ManyToOne(() => Organizations, (organization) => organization.course, {
    eager: true,
  })
  @JoinColumn({ name: 'organization_id' })
  organization: Organizations;
  @RelationId((course: Course) => course.organization)
  @Column({ type: 'int' })
  organization_id: number;
  /**
   * Relation with Course Status
   */
  @ManyToOne(() => CourseStatus, (coursestatus) => coursestatus.course, {
    eager: true,
  })
  @JoinColumn({ name: 'course_status_id' })
  course_status: CourseStatus;
  @RelationId((course: Course) => course.course_status)
  @Column({ type: 'int' })
  course_status_id: number;
}
