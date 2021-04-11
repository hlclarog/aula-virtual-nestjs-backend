import { Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CollectionTypesService } from './collection_types.service';
import { BaseController } from '../../base/base.controller';
import { CollectionTypes } from './collection_types.entity';
import { CreateCurrencyDto, UpdateCurrencyDto } from './collection_types.dto';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'collection_types' })
export class CollectionTypesController extends BaseController<
  CollectionTypes,
  CreateCurrencyDto,
  UpdateCurrencyDto
> {
  constructor(
    private readonly collection_typesService: CollectionTypesService,
  ) {
    super(collection_typesService);
  }
  @Post()
  async post(@Body() createDto: CreateCurrencyDto) {
    return await this.create(createDto);
  }

  @Get()
  async fetchAll() {
    return await this.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.findOne(id);
  }

  @Put(':id')
  async edit(@Param('id') id: string, @Body() updateDto: UpdateCurrencyDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
