import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModulesDto, UpdateModulesDto } from './modules.dto';
import { BaseController } from '../../../base/base.controller';
import { Modules } from './modules.entity';
import { ControllerApi } from '../../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'modules' })
export class ModulesController extends BaseController<
  Modules,
  CreateModulesDto,
  UpdateModulesDto
> {
  constructor(private modulesService: ModulesService) {
    super(modulesService);
  }

  @Post()
  async post(@Body() createDto: CreateModulesDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateModulesDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }

  @Get('banner/:id')
  async getBannerByModule(@Param('id') id: number) {
    const data = await this.modulesService.getBannerByModule(id);
    return { data };
  }
}
