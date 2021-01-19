import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Programs } from '../programs/programs.entity';
import { PROGRAM_TYPES_ENTITY } from './program_types.dto';

@Entity({ name: PROGRAM_TYPES_ENTITY })
export class ProgramTypes extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @OneToMany(() => Programs, (program) => program.program_type)
  programs: Programs[];
}
