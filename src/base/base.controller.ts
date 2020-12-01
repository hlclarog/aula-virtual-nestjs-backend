import {
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
  Response,
} from '@nestjs/common';
import { BaseService } from './base.service';
import { DeleteResult, UpdateResult } from 'typeorm';

export class IApiResponse<T> {
  message: string;
  data: T;
  status: number;
  error?: string;

  constructor(message: string, data: T, status: number, error?: string) {
    this.message = message;
    this.data = data;
    this.status = status;
    this.error = error;
  }
}

export abstract class BaseController<ENTITY, CREATE_DTO, UPDATE_DTO> {
  private service: BaseService<ENTITY, CREATE_DTO, UPDATE_DTO>;
  protected constructor(service) {
    this.service = service;
  }

  @Post()
  async create(@Body() createDto: CREATE_DTO, @Response() res) {
    const result = await this.service.create(createDto);
    const response = new IApiResponse<ENTITY>(
      'Request Successful',
      result,
      HttpStatus.OK,
    );
    return res.status(response.status).json(response);
  }

  @Get()
  async findAll(@Response() res) {
    const result = await this.service.findAll();
    const response = new IApiResponse<ENTITY[]>(
      'Request Successful',
      result,
      HttpStatus.OK,
    );
    return res.status(response.status).json(response);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Response() res) {
    const result = await this.service.findOne(+id);
    const response = new IApiResponse<ENTITY>(
      'Request Successful',
      result,
      HttpStatus.OK,
    );
    return res.status(response.status).json(response);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UPDATE_DTO,
    @Response() res,
  ) {
    const result = await this.service.update(+id, updateDto);
    const response = new IApiResponse<UpdateResult>(
      'Updated Successfully',
      result,
      HttpStatus.OK,
    );
    return res.status(response.status).json(response);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Response() res) {
    const result = await this.service.remove(+id);
    const response = new IApiResponse<DeleteResult>(
      'Delete Successfully',
      result,
      HttpStatus.OK,
    );
    return res.status(response.status).json(response);
  }
}
