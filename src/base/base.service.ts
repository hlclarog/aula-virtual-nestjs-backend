import { Injectable } from '@nestjs/common';
import { BaseRepo } from './base-repo';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export abstract class BaseService<E, C, U> {
  public abstract getRepo(): BaseRepo<E>;

  async create(createDto: C) {
    return await this.getRepo().save(createDto);
  }

  async findAll(): Promise<E[]> {
    return await this.getRepo().find();
  }

  async findOne(id: number): Promise<E> {
    return this.getRepo().findOneOrFail(id);
  }

  async update(id: number, updateDto: U): Promise<UpdateResult> {
    return await this.getRepo().update(id, updateDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.getRepo().softDelete(id);
  }
}
