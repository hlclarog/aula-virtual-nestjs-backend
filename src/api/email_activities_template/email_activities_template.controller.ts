import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EmailActivitiesTemplateService } from './email_activities_template.service';
import {
  CreateEmailActivitiesTemplateDto,
  UpdateEmailActivitiesTemplateDto,
} from './email_activities_template.dto';
import { BaseController } from '../../base/base.controller';
import { EmailActivitiesTemplate } from './email_activities_template.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'email_activities_template' })
export class EmailActivitiesTemplateController extends BaseController<
  EmailActivitiesTemplate,
  CreateEmailActivitiesTemplateDto,
  UpdateEmailActivitiesTemplateDto
> {
  constructor(
    private email_activities_templateService: EmailActivitiesTemplateService,
  ) {
    super(email_activities_templateService);
  }

  @Post()
  async post(@Body() createDto: CreateEmailActivitiesTemplateDto) {
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
  async edit(
    @Param('id') id: string,
    @Body() updateDto: CreateEmailActivitiesTemplateDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }

  @Get('ByEmailTemplate/:id')
  async byEmailTemplate(@Param('id') id: number) {
    const data = await this.email_activities_templateService.byEmailTemplate(
      id,
    );
    return { data };
  }
}
