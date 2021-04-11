import { Body, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { BaseController } from '../../base/base.controller';
import { Programs } from './programs.entity';
import { CreateProgramsDto, UpdateProgramsDto } from './programs.dto';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from '../../utils/providers/info-user.module';
import { InterestAreasService } from '../interest_areas/interest_areas.service';

@ControllerApi({ name: 'programs' })
export class ProgramsController extends BaseController<
  Programs,
  CreateProgramsDto,
  UpdateProgramsDto
> {
  constructor(
    private readonly programsService: ProgramsService,
    private readonly interestAreasService: InterestAreasService,
    @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider,
  ) {
    super(programsService);
  }
  @Post()
  async post(@Body() createDto: CreateProgramsDto) {
    return await this.create(createDto);
  }

  @Get()
  async fetchAll() {
    const result = await this.programsService.find();
    return {
      data: result,
    };
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.findOne(id);
  }

  @Put(':id')
  async edit(@Param('id') id: string, @Body() updateDto: UpdateProgramsDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }

  @Get('catalog/:type')
  async fetchAllCatalog(@Param('type') type: string) {
    let result: any = [];
    switch (type) {
      case 'list':
        // result = await this.programsService.findAllCatalog(this.infoUser.id);
        break;
      case 'group':
        result = await this.interestAreasService.findGroupProgram(
          this.infoUser.id,
          'all',
        );
        break;
    }
    return {
      data: result,
    };
  }
}
