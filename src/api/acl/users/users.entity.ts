import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Base } from '../../../base/base.entity';
import { UsersRoles } from '../users_roles/users_roles.entity';
import { USERS_ENTITY } from './users.dto';
import { CourseUsers } from '../../course-users/course-users.entity';
import { ProgramUsers } from './../../program_users/program_users.entity';
import { Courses } from '../../courses/courses.entity';
import { LessonScormIntents } from './../../lesson_scorm_intents/lesson_scorm_intents.entity';
import { ActivityTryUsers } from './../../activity_try_users/activity_try_users.entity';
import { Themes } from './../../themes/themes.entity';
import { LessonTryUsers } from './../../lesson_try_users/lesson_try_users.entity';
import { LessonComments } from './../../lesson_comments/lesson_comments.entity';
import { LessonCommentReactions } from './../../lesson_comment_reactions/lesson_comment_reactions.entity';
import { Languages } from './../../languages/languages.entity';
import { PointsUserLog } from './../../points_user_log/points_user_log.entity';
import { Lessons } from './../../lessons/lessons.entity';
import { ProgramPayment } from '../../program_payment/program_payment.entity';
import { UsersOrganizations } from './../../users_organizations/users_organizations.entity';
import { CourseTeachers } from './../../course_teachers/course_teachers.entity';
import { UsersCompetences } from './../../users_competences/users_competences.entity';
import { UsersPositionGoals } from './../../users_position_goals/users_position_goals.entity';
import { CoursePayments } from '../../course_payments/course_payments.entity';
import { IdentificationTypes } from './../../identification_types/identification_types.entity';
import { CourseNotes } from './../../course_notes/course_notes.entity';

@Entity(USERS_ENTITY)
export class Users extends Base {
  @ManyToOne(() => Themes, (theme) => theme.users)
  @JoinColumn({ name: 'theme_id' })
  theme: Themes;

  @RelationId((user: Users) => user.theme)
  @Column({ type: 'integer' })
  theme_id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  lastname: string;

  @Column({ type: 'text' })
  picture: string;

  @Column({ type: 'text' })
  phone: string;

  @Column({ type: 'text' })
  gender: string;

  @Column({ type: 'text' })
  birthday: string;

  @Column({ type: 'text' })
  linkedin: string;

  @Column({ type: 'text' })
  profile_description: string;

  @Column({ type: 'text' })
  facebook: string;

  @Column({ type: 'text' })
  google: string;

  @Column({ type: 'text' })
  twitter: string;

  @Column({ type: 'text' })
  profession: string;

  @Column({ type: 'text' })
  country: string;

  @Column({ type: 'text' })
  state: string;

  @Column({ type: 'text' })
  city: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'text' })
  zipcode: string;

  @ManyToOne(
    () => IdentificationTypes,
    (identification_type) => identification_type.users,
  )
  @JoinColumn({ name: 'identification_type_id' })
  identification_type: IdentificationTypes;

  @RelationId((user: Users) => user.identification_type)
  @Column({ type: 'integer' })
  identification_type_id: number;

  @Column({ type: 'text' })
  identification: string;

  @Column({ type: 'text' })
  welcome_message: boolean;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'timestamp' })
  last_login: Date;

  @Column({ type: 'integer' })
  points: number;

  @Column({ type: 'integer' })
  lives: number;

  @OneToMany(() => UsersRoles, (user_rol) => user_rol.user)
  users_roles: UsersRoles[];

  @OneToMany(() => Courses, (courses) => courses.user)
  courses: Courses[];

  @OneToMany(() => Lessons, (lessons) => lessons.user)
  lessons: Lessons[];

  @OneToMany(() => CourseUsers, (courseUsers) => courseUsers.user)
  course_users: CourseUsers[];

  @OneToMany(() => ProgramUsers, (programUsers) => programUsers.user)
  program_users: ProgramUsers[];

  @OneToMany(
    () => LessonScormIntents,
    (lesson_scorm_intent) => lesson_scorm_intent.user,
  )
  lesson_scorm_intents: LessonScormIntents[];

  @OneToMany(
    () => ActivityTryUsers,
    (activity_try_user) => activity_try_user.user,
  )
  activity_try_users: ActivityTryUsers[];

  @OneToMany(() => LessonTryUsers, (lesson_try_user) => lesson_try_user.user)
  lesson_try_users: LessonTryUsers[];

  @OneToMany(() => LessonComments, (lesson_comment) => lesson_comment.user)
  lesson_comments: LessonComments[];

  @OneToMany(
    () => LessonCommentReactions,
    (lesson_comment_reactions) => lesson_comment_reactions.user,
  )
  lesson_comment_reactions: LessonCommentReactions[];

  @ManyToOne(() => Languages, (language) => language.users)
  @JoinColumn({ name: 'language_id' })
  language: Languages;

  @RelationId((user: Users) => user.language)
  @Column({ type: 'integer' })
  language_id: number;

  @OneToMany(() => PointsUserLog, (points_user_log) => points_user_log.user)
  points_user_log: PointsUserLog[];

  @Column({ type: 'text', default: 'local' })
  origin: string;

  @OneToMany(
    () => ProgramPayment,
    (program_payment) => program_payment.programs,
  )
  program_payment: ProgramPayment[];

  @OneToMany(() => CoursePayments, (course_payments) => course_payments.courses)
  course_payments: CoursePayments[];

  @OneToMany(
    () => UsersOrganizations,
    (courseOrganization) => courseOrganization.user,
  )
  users_organizations: UsersOrganizations[];

  @OneToMany(() => CourseTeachers, (courseUsers) => courseUsers.user)
  course_teachers: CourseTeachers[];

  @OneToMany(
    () => UsersCompetences,
    (usersCompetences) => usersCompetences.user,
  )
  users_competences: UsersCompetences[];

  @OneToMany(
    () => UsersPositionGoals,
    (usersCompetences) => usersCompetences.user,
  )
  users_position_goals: UsersPositionGoals[];
  @OneToMany(() => CourseNotes, (courseNotes) => courseNotes.user)
  course_notes: CourseNotes[];
}
