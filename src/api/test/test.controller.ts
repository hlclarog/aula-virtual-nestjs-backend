import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTestDto, UpdateTestDto } from './test.dto';
import { TestService } from './test.service';

@ApiTags('test')
@Controller('/api/test')
export class TestController {
  constructor(private testService: TestService) {}

  @Get()
  public async get() {
    const result = await this.testService.findAll();
    return { data: result };
  }

  @Post()
  public async save(@Body() test: CreateTestDto) {
    const result = await this.testService.create(test);
    return { data: result };
  }

  @Put('/:id')
  public async update(@Param('id') id: number, @Body() test: UpdateTestDto) {
    const result = await this.testService.update(id, test);
    return { data: result };
  }

  @Delete('/:id')
  public async delete(@Param('id') id: number) {
    const result = await this.testService.delete(id);
    return { data: result };
  }
}
