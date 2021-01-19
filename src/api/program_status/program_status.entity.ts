import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Programs } from '../programs/programs.entity';
import { PROGRAM_STATUS_ENTITY } from './program_status.dto';

@Entity({ name: PROGRAM_STATUS_ENTITY })
export class ProgramStatus extends Base {
  @Column({ length: 500, type: 'varchar' })
  description: string;

  @OneToMany(() => Programs, (program) => program.program_type)
  programs: Programs[];
}
