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
import { PointsUserLog } from '../points_user_log/points_user_log.entity';
import { CourseLessons } from '../course_lessons/course_lessons.entity';
import { CourseTeachers } from '../course_teachers/course_teachers.entity';
import { CoursePayments } from '../course_payments/course_payments.entity';
import { CourseNotes } from '../course_notes/course_notes.entity';

@Entity({ name: COURSE_ENTITY })
export class Courses extends Base {
  @Column({ type: 'varchar' }) code: string;
  @Column({ type: 'varchar' }) name: string;
  @Column({ type: 'varchar' }) description: string;
  @Column({ type: 'varchar' }) picture: string;
  @Column({ type: 'varchar' }) picture_banner: string;
  @Column({ type: 'varchar' }) short_name: string;
  @Column({ type: 'boolean' }) free: boolean;
  @Column({ type: 'boolean' }) certifiable: boolean;

  @ManyToOne(() => Users, (users) => users.courses)
  @JoinColumn({ name: 'user_id' })
  user: Users;
  @RelationId((courses: Courses) => courses.user)
  @Column({ type: 'integer' })
  user_id: number;

  @ManyToOne(() => Organizations, (organization) => organization.course)
  @JoinColumn({ name: 'organization_id' })
  organization: Organizations;
  @RelationId((courses: Courses) => courses.organization)
  @Column({ type: 'integer' })
  organization_id: number;

  @ManyToOne(() => CourseStatus, (coursesStatus) => coursesStatus.course)
  @JoinColumn({ name: 'course_status_id' })
  course_status: CourseStatus;
  @RelationId((courses: Courses) => courses.course_status)
  @Column({ type: 'integer' })
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

  @OneToMany(() => CourseLessons, (course_lesson) => course_lesson.course)
  course_lessons: CourseLessons[];

  @OneToMany(() => PointsUserLog, (point_user_log) => point_user_log.course)
  points_user_log: PointsUserLog[];

  // @AfterLoad()
  // async updateCounters() {
  //   if (this.picture)
  //     this.picture = await this.awsService.getFile(this.picture);
  // }

  @Column({ type: 'integer' }) parent_id: boolean;

  @OneToMany(() => CourseTeachers, (courseUsers) => courseUsers.course)
  course_teachers: CourseTeachers[];
  @OneToMany(() => CoursePayments, (course_payments) => course_payments.courses)
  course_payment: CoursePayments[];
  @OneToMany(() => CourseNotes, (courseNotes) => courseNotes.course)
  course_notes: CourseNotes[];
}
