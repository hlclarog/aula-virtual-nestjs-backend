import { Column, Entity } from 'typeorm';
import { COURSE_STATUS_ENTITY } from './course-status.dto';
import { Base } from '../../base/base.entity';

@Entity({ name: COURSE_STATUS_ENTITY })
export class CourseStatus extends Base {
  @Column({ type: 'varchar' }) description: string;
}
