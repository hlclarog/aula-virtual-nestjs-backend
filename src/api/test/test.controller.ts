import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Response,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from './../../filters/http-exception.filter';
import { CreateTestDto, UpdateTestDto } from './test.dto';
import { TestService } from './test.service';

@ApiTags('test')
@Controller('/api/test')
@UseFilters(new HttpExceptionFilter())
export class TestController {
  constructor(private testService: TestService) {}

  @Get()
  public async get(@Response() res) {
    const result = await this.testService.findAll();
    return res.status(HttpStatus.OK).json(result);
  }

  @Post()
  public async save(@Response() res, @Body() test: CreateTestDto) {
    const result = await this.testService.create(test);
    return res.status(HttpStatus.OK).json(result);
  }

  @Put('/:id')
  public async update(
    @Param('id') id: number,
    @Response() res,
    @Body() test: UpdateTestDto,
  ) {
    const result = await this.testService.update(id, test);
    return res.status(HttpStatus.OK).json(result);
  }

  @Delete('/:id')
  public async delete(@Param('id') id: number, @Response() res) {
    const result = await this.testService.delete(id);
    return res.status(HttpStatus.OK).json(result);
  }
}
