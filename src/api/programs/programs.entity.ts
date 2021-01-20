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
@Entity({ name: PROGRAMS_ENTITY })
export class Programs extends Base {
  @ManyToOne(() => ProgramTypes, (program_type) => program_type.programs, {
    eager: true,
  })
  @JoinColumn({ name: 'program_type_id' })
  program_type: Users;
  @RelationId((programs: Programs) => programs.program_type)
  program_type_id: number;

  @ManyToOne(() => ProgramStatus, (program_status) => program_status.programs, {
    eager: true,
  })
  @JoinColumn({ name: 'program_status_id' })
  program_status: Users;
  @RelationId((programs: Programs) => programs.program_status)
  program_status_id: number;

  @ManyToOne(() => Organizations, (organization) => organization.programs, {
    eager: true,
  })
  @JoinColumn({ name: 'organization_id' })
  organization: Organizations;
  @RelationId((programs: Programs) => programs.organization)
  organization_id: number;

  @Column({ type: 'varchar' }) name: string;
  @Column({ type: 'varchar' }) description: string;
  @Column({ type: 'varchar' }) shortname: string;
  @Column({ type: 'varchar' }) picture: string;
  @Column({ type: 'varchar' }) video_url: string;
  @Column({ type: 'int' }) duration: number;
  @Column({ type: 'varchar' }) email_to: string;
  @Column({ type: 'boolean' }) active: boolean;

  @OneToMany(
    () => ProgramFeeSchedules,
    (programFeeSchedule) => programFeeSchedule.program,
  )
  program_fee_schedules: ProgramFeeSchedules[];

  @OneToMany(() => ProgramCourses, (programCourses) => programCourses.program)
  program_courses: ProgramCourses[];

  @OneToMany(() => ProgramUsers, (programUsers) => programUsers.program)
  program_users: ProgramUsers[];
}