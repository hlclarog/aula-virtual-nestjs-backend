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
    return await this.repository.find({
      where: { program_id: id },
    });
  }
}
