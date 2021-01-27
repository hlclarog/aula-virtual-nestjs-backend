import { Base } from '../../base/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Organizations } from '../organizations/organizations.entity';
import { COURSE_ENTITY } from './courses.dto';
import { Users } from '../acl/users/users.entity';
import { CourseStatus } from '../course-status/course-status.entity';
import { CourseFeeSchedules } from '../course-fee-schedule/course-fee-schedule.entity';
import { CourseUsers } from '../course-users/course-users.entity';
import { ProgramCourses } from '../program_courses/program_courses.entity';
import { CourseInterestAreas } from '../course_interest_areas/course_interest_areas.entity';
import { CourseCompetences } from '../course_competences/course_competences.entity';
import { CourseCommissionOrganizations } from '../course_comission_organizations/course_commission_organizations.entity';
import { CourseUnits } from '../course_units/course_units.entity';

@Entity({ name: COURSE_ENTITY })
export class Courses extends Base {
  @Column({ type: 'varchar' }) name: string;
  @Column({ type: 'varchar' }) description: string;
  @Column({ type: 'varchar' }) short_name: string;
  @Column({ type: 'boolean' }) free: boolean;
  @Column({ type: 'boolean' }) certifiable: boolean;

  @ManyToOne(() => Users, (users) => users.course, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: Users | number;

  @RelationId((courses: Courses) => courses.user)
  user_id: number;

  @ManyToOne(() => Organizations, (organization) => organization.course, {
    eager: true,
  })
  @JoinColumn({ name: 'organization_id' })
  organization: Organizations | number;

  @RelationId((courses: Courses) => courses.organization)
  organization_id: number;

  @ManyToOne(() => CourseStatus, (coursesStatus) => coursesStatus.course, {
    eager: true,
  })
  @JoinColumn({ name: 'course_status_id' })
  course_status: CourseStatus | number;

  @RelationId((courses: Courses) => courses.course_status)
  course_status_id: number;

  @OneToMany(
    () => CourseFeeSchedules,
    (courseFeeSchedules) => courseFeeSchedules.course,
  )
  course_fee_schedules: CourseFeeSchedules[];

  @OneToMany(() => CourseUsers, (courseUsers) => courseUsers.course)
  course_users: CourseUsers[];

  @OneToMany(() => ProgramCourses, (programCourses) => programCourses.course)
  program_courses: ProgramCourses[];

  @OneToMany(
    () => CourseInterestAreas,
    (courseInterestAreas) => courseInterestAreas.course,
  )
  course_interest_areas: CourseInterestAreas[];

  @OneToMany(
    () => CourseCompetences,
    (courseCompetences) => courseCompetences.course,
  )
  course_competences: CourseCompetences[];

  @OneToMany(
    () => CourseCommissionOrganizations,
    (courseCommissionOrganizations) => courseCommissionOrganizations.course,
  )
  course_commission_organizations: CourseCommissionOrganizations[];

  @OneToMany(() => CourseUnits, (courseUnits) => courseUnits.course)
  course_units: CourseUnits[];
}
