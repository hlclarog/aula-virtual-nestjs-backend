import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { COURSE_NOTES_ENTITY } from './course_notes.dto';
import { Base } from '../../base/base.entity';
import { Users } from '../acl/users/users.entity';
import { Courses } from '../courses/courses.entity';

@Entity(COURSE_NOTES_ENTITY)
export class CourseNotes extends Base {
  @ManyToOne(() => Courses, (courses) => courses.course_notes)
  @JoinColumn({ name: 'course_id' })
  course: Courses;

  @RelationId((courseNotes: CourseNotes) => courseNotes.course)
  @Column({ type: 'integer' })
  course_id: number;

  @ManyToOne(() => Users, (users) => users.course_notes)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @RelationId((courseNotes: CourseNotes) => courseNotes.user)
  @Column({ type: 'integer' })
  user_id: number;

  @Column({ type: 'varchar' }) content: string;
  @Column({ type: 'varchar' }) description: string;
}
