import { HttpException } from '@nestjs/common';
import { RepositoryModule } from 'repository.module';
import { Model } from 'sequelize-typescript';
import {
  BulkCreateOptions,
  CountOptions,
  FindOrCreateOptions,
  Transaction,
} from 'sequelize/types';

export class GetOptions {
  includeDeleted?: boolean = false
}

export class getOptionsCache extends GetOptions {
  ttl?: number = RepositoryModule.defaultTTL
}

export class ListGetOptionsCache {
  ttl?: number = RepositoryModule.defaultTTL
  includeDeleted?: boolean = false
}

export abstract class Repository<T extends Model<T>> {
  private cacheModel = null
  private model: any
  constructor(model: any, cacheModel: string) {
    this.model = model
    this.cacheModel = cacheModel
  }
  protected async softDelete(dataModel: any, transaction?: Transaction): Promise<T> {
    if (!dataModel)
      throw new HttpException('data model null, nothing to update', 500)

    return await dataModel.update({ isDeleted: true }, transaction)
  }


  async bulkCreate(values: object[], options?: BulkCreateOptions, transaction?: Transaction): Promise<T[]> {
    return await this.model.bulkCreate(values, { ...options, transaction })
  }

  async findOrCreate(options: FindOrCreateOptions, transaction: Transaction): Promise<[T, boolean]> {
    return await this.model.findOrCreate({ ...options, transaction })
  }

  async findOrBuild(options: FindOrCreateOptions, transaction?: Transaction): Promise<[T, boolean]> {
    return await this.model.findOrBuild({ ...options, transaction })
  }

  async count(options: CountOptions): Promise<number> {
    return await this.model.count(options)
  }
}
