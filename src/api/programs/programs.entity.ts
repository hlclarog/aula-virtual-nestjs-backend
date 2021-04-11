import { Base } from '../../base/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Users } from '../acl/users/users.entity';
import { PROGRAMS_ENTITY } from './programs.dto';
import { ProgramTypes } from '../program_types/program_types.entity';
import { ProgramStatus } from '../program_status/program_status.entity';
import { Organizations } from '../organizations/organizations.entity';
import { ProgramFeeSchedules } from '../program_fee_schedules/program_fee_schedules.entity';
import { ProgramCourses } from '../program_courses/program_courses.entity';
import { ProgramUsers } from '../program_users/program_users.entity';
import { ProgramInterestAreas } from '../program_interest_areas/program_interest_areas.entity';
import { ProgramCommissionOrganizations } from '../program_comission_organizations/program_commission_organizations.entity';
import { ProgramPayment } from '../program_payment/program_payment.entity';
@Entity({ name: PROGRAMS_ENTITY })
export class Programs extends Base {
  @ManyToOne(() => ProgramTypes, (program_type) => program_type.programs)
  @JoinColumn({ name: 'program_type_id' })
  program_type: Users;
  @RelationId((programs: Programs) => programs.program_type)
  @Column({ type: 'int' })
  program_type_id: number;

  @ManyToOne(() => ProgramStatus, (program_status) => program_status.programs)
  @JoinColumn({ name: 'program_status_id' })
  program_status: ProgramStatus;
  @RelationId((programs: Programs) => programs.program_status)
  @Column({ type: 'int' })
  program_status_id: number;

  @ManyToOne(() => Organizations, (organization) => organization.programs)
  @JoinColumn({ name: 'organization_id' })
  organization: Organizations;
  @RelationId((programs: Programs) => programs.organization)
  @Column({ type: 'int' })
  organization_id: number;

  @Column({ type: 'varchar' }) name: string;
  @Column({ type: 'varchar' }) description: string;
  @Column({ type: 'varchar' }) shortname: string;
  @Column({ type: 'varchar' }) picture: string;
  @Column({ type: 'varchar' }) video_url: string;
  @Column({ type: 'int' }) duration: number;
  @Column({ type: 'varchar' }) email_to: string;
  @Column({ type: 'boolean' }) active: boolean;
  @Column({ type: 'boolean' }) certifiable: boolean;
  @Column({ type: 'varchar' }) requirements: string;
  @Column({ type: 'integer' }) certifiable_number: number;
  @Column({ type: 'boolean' }) by_credit: boolean;

  @OneToMany(
    () => ProgramFeeSchedules,
    (programFeeSchedule) => programFeeSchedule.program,
  )
  program_fee_schedules: ProgramFeeSchedules[];

  @OneToMany(() => ProgramCourses, (programCourses) => programCourses.program)
  program_courses: ProgramCourses[];

  @OneToMany(() => ProgramUsers, (programUsers) => programUsers.program)
  program_users: ProgramUsers[];

  @OneToMany(
    () => ProgramInterestAreas,
    (programInterestAreas) => programInterestAreas.program,
  )
  program_interest_areas: ProgramInterestAreas[];

  @OneToMany(
    () => ProgramCommissionOrganizations,
    (programCommissionOrganizations) => programCommissionOrganizations.program,
  )
  program_commission_organizations: ProgramCommissionOrganizations[];

  @OneToMany(() => ProgramPayment, (program_payment) => program_payment.programs)
  program_payment: ProgramPayment[];
}
