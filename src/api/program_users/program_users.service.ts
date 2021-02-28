import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import { ProgramUsers } from './program_users.entity';
import { BaseRepo } from '../../base/base.repository';
import {
  CreateProgramUsersDto,
  PROGRAM_USERS_PROVIDER,
  UpdateProgramUsersDto,
} from './program_users.dto';

@Injectable()
export class ProgramUsersService extends BaseService<
  ProgramUsers,
  CreateProgramUsersDto,
  UpdateProgramUsersDto
> {
  @Inject(PROGRAM_USERS_PROVIDER) repository: BaseRepo<ProgramUsers>;

  async findByProgram(id: number): Promise<ProgramUsers[]> {
    return this.repository
      .createQueryBuilder('program_users')
      .select([
        'program_users.id',
        'program_users.program_id',
        'program_users.user_id',
        'program_users.enrollment_status_id',
        'program_users.enrollment_type_id',
        'program_users.transaction_status_id',
        'program_users.begin_date',
        'program_users.end_date',
        'program_users.ref_transaction',
        'program_users.certificate_file',
        'program_users.certificate_code_validation',
        'program_users.private_inscription',
        'program_users.favorite',
        'program_users.downloaded',
        'program_users.paid_value',
        'program_users.active',
        'user.id',
        'user.name',
        'user.email',
        'user.active',
      ])
      .leftJoin('program_users.user', 'user')
      .where('program_users.program_id = :id', { id })
      .getMany();
  }
}
