import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EmailTemplatesService } from './email_templates.service';
import {
  CreateEmailTemplatesDto,
  UpdateEmailTemplatesDto,
} from './email_templates.dto';
import { BaseController } from '../../base/base.controller';
import { EmailTemplates } from './email_templates.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('email_templates')
@Controller('/api/email_templates')
export class EmailTemplatesController extends BaseController<
  EmailTemplates,
  CreateEmailTemplatesDto,
  UpdateEmailTemplatesDto
> {
  constructor(email_templatesService: EmailTemplatesService) {
    super(email_templatesService);
  }

  @Post()
  async post(@Body() createDto: CreateEmailTemplatesDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateEmailTemplatesDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
