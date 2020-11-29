import { Inject, Injectable } from '@nestjs/common';
import {
  BASE_PROVIDER,
  CreateBaseDto,
  UpdateBaseDto,
} from './dto/create-base.dto';
import { Repository } from 'typeorm';
import { Base } from './entities/base.entity';

@Injectable()
export class BaseService {
  constructor(
    @Inject(BASE_PROVIDER) private baseRepository: Repository<Base>,
  ) {}

  create(createBaseDto: CreateBaseDto) {
    return 'This action adds a new base';
  }

  async findAll(): Promise<Base[]> {
    return await this.baseRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} base`;
  }

  update(id: number, updateBaseDto: UpdateBaseDto) {
    return `This action updates a #${id} base`;
  }

  remove(id: number) {
    return `This action removes a #${id} base`;
  }
}
