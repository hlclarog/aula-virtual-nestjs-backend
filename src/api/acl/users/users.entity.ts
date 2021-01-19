import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../../base/base.entity';
import { UsersRoles } from '../users_roles/users_roles.entity';
import { USERS_ENTITY } from './users.dto';
import { Course } from '../../courses/course.entity';
import { CourseUsers } from '../../course-users/course-users.entity';

@Entity(USERS_ENTITY)
export class Users extends Base {
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
  linkeid: string;

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

  @OneToMany(() => Course, (courses) => courses.user)
  course: Course[];

  @OneToMany(() => CourseUsers, (courseUsers) => courseUsers.user)
  course_users: CourseUsers[];
}
