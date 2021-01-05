import { Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TesttwoService } from './testtwo.service';
import { CreateTesttwoDto } from './dto/create-testtwo.dto';
import { UpdateTesttwoDto } from './dto/update-testtwo.dto';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'testtwo' })
export class TesttwoController {
  constructor(private readonly testtwoService: TesttwoService) {}

  @Post()
  create(@Body() createTesttwoDto: CreateTesttwoDto) {
    return this.testtwoService.create(createTesttwoDto);
  }

  @Get()
  async findAll() {
    const result = await this.testtwoService.findAll();
    return { data: result };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testtwoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTesttwoDto: UpdateTesttwoDto) {
    return this.testtwoService.update(+id, updateTesttwoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testtwoService.remove(+id);
  }
}
