import { Injectable } from '@nestjs/common';
import { BaseRepo } from './base.repository';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export abstract class BaseService<ENTITY, CREATE_DTO, UPDATE_DTO> {
  public abstract repository: BaseRepo<ENTITY>;

  async findAll(): Promise<ENTITY[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<ENTITY> {
    return this.repository.findOneOrFail(id);
  }

  async create(createDto: CREATE_DTO) {
    return await this.repository.save(createDto);
  }

  async update(id: number, updateDto: UPDATE_DTO): Promise<UpdateResult> {
    return await this.repository.update(id, updateDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.repository.softDelete(id);
  }
}
