import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { COURSE_COMMISSION_ORGANIZATIONS_ENTITY } from './course_commission_organizations.dto';
import { Courses } from '../courses/courses.entity';
import { Organizations } from '../organizations/organizations.entity';

@Entity({ name: COURSE_COMMISSION_ORGANIZATIONS_ENTITY })
export class CourseCommissionOrganizations extends Base {
  @ManyToOne(
    () => Courses,
    (courses) => courses.course_commission_organizations,
  )
  @JoinColumn({ name: 'course_id' })
  course: Courses;
  @RelationId(
    (courseCommissionOrganizations: CourseCommissionOrganizations) =>
      courseCommissionOrganizations.course,
  )
  @Column({ type: 'integer' })
  course_id: number;

  @ManyToOne(
    () => Organizations,
    (organization) => organization.course_commission_organizations,
  )
  @JoinColumn({ name: 'organization_id' })
  organization: Organizations;
  @RelationId(
    (courseCommissionOrganizations: CourseCommissionOrganizations) =>
      courseCommissionOrganizations.organization,
  )
  @Column({ type: 'integer' })
  organization_id: number;

  @Column({ type: 'int' }) percentage: number;
}
