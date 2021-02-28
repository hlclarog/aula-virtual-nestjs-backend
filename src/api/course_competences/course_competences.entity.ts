import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { COURSE_COMPETENCES_ENTITY } from './course_competences.dto';
import { Base } from '../../base/base.entity';
import { Courses } from '../courses/courses.entity';
import { Competence } from '../competences/competence.entity';

@Entity(COURSE_COMPETENCES_ENTITY)
export class CourseCompetences extends Base {
  @ManyToOne(() => Courses, (courses) => courses.course_competences)
  @JoinColumn({ name: 'course_id' })
  course: Courses;
  @RelationId(
    (courseCompetences: CourseCompetences) => courseCompetences.course,
  )
  @Column({ type: 'integer' })
  course_id: number;

  @ManyToOne(() => Competence, (competence) => competence.course_competences)
  @JoinColumn({ name: 'competence_id' })
  competence: Competence;
  @RelationId(
    (courseCompetences: CourseCompetences) => courseCompetences.competence,
  )
  @Column({ type: 'integer' })
  competence_id: number;
}
