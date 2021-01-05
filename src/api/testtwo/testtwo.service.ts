import { Inject, Injectable } from '@nestjs/common';
import { CreateTesttwoDto, TESTTWO_PROVIDER } from './dto/create-testtwo.dto';
import { UpdateTesttwoDto } from './dto/update-testtwo.dto';
import { Repository } from 'typeorm';
import { Testtwo } from './entities/testtwo.entity';

@Injectable()
export class TesttwoService {
  constructor(
    @Inject(TESTTWO_PROVIDER) private testtwoRepository: Repository<Testtwo>,
  ) {}

  create(createTesttwoDto: CreateTesttwoDto) {
    return 'This action adds a new testtwo';
  }

  async findAll() {
    return await this.testtwoRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} testtwo`;
  }

  update(id: number, updateTesttwoDto: UpdateTesttwoDto) {
    return `This action updates a #${id} testtwo`;
  }

  remove(id: number) {
    return `This action removes a #${id} testtwo`;
  }
}
