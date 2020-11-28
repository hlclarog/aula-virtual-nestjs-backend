import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTestDto, TEST_PROVIDER, UpdateTestDto } from './test.dto';
import { Test } from './test.entity';

@Injectable()
export class TestService {
  constructor(
    @Inject(TEST_PROVIDER) private testRepository: Repository<Test>,
  ) {}

  async findAll(): Promise<Test[]> {
    return await this.testRepository.find();
  }

  async create(data: CreateTestDto) {
    return await this.testRepository.save(data);
  }

  async update(id: number, data: UpdateTestDto) {
    return await this.testRepository.update(id, data);
  }

  async delete(id: number) {
    return await this.testRepository.delete(id);
  }
}
