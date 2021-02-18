import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { COURSE_INTEREST_AREAS_ENTITY } from './course_interest_areas.dto';
import { Base } from '../../base/base.entity';
import { InterestAreas } from '../interest_areas/interest_areas.entity';
import { Courses } from '../courses/courses.entity';

@Entity(COURSE_INTEREST_AREAS_ENTITY)
export class CourseInterestAreas extends Base {
  @ManyToOne(() => Courses, (course) => course.course_interest_areas, {
    eager: true,
  })
  @JoinColumn({ name: 'course_id' })
  course: Courses;
  @RelationId(
    (courseInterestAreas: CourseInterestAreas) => courseInterestAreas.course,
  )
  @Column({ type: 'integer' })
  course_id: number;

  @ManyToOne(
    () => InterestAreas,
    (interest_areas) => interest_areas.course_interest_areas,
    { eager: true },
  )
  @JoinColumn({ name: 'interest_area_id' })
  interest_area: InterestAreas;
  @RelationId(
    (courseInterestAreas: CourseInterestAreas) =>
      courseInterestAreas.interest_area,
  )
  @Column({ type: 'integer' })
  interest_area_id: number;
}
