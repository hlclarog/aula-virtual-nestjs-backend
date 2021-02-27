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
  address: string;

  @Column({ type: 'text' })
  zipcode: string;

  @Column({ type: 'text' })
  identification_type_id: number;

  @Column({ type: 'text' })
  identification: string;

  @Column({ type: 'text' })
  welcome_message: boolean;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @OneToMany(() => UsersRoles, (user_rol) => user_rol.user)
  users_roles: UsersRoles[];

  @OneToMany(() => Courses, (courses) => courses.user)
  course: Courses[];

  @OneToMany(() => CourseUsers, (courseUsers) => courseUsers.user)
  course_users: CourseUsers[];

  @OneToMany(() => ProgramUsers, (programUsers) => programUsers.user)
  program_users: ProgramUsers[];

  @OneToMany(
    () => LessonScormIntents,
    (lesson_scorm_intent) => lesson_scorm_intent.lesson,
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
}
