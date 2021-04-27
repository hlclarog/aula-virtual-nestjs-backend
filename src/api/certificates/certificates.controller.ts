import { Body, Delete, Get, Param, Post } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CreateCertificatesDto } from './certificates.dto';
import { BaseController } from '../../base/base.controller';
import { Certificates } from './certificates.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'certificates' })
export class CertificatesController extends BaseController<
  Certificates,
  CreateCertificatesDto,
  null
> {
  constructor(private certificatesService: CertificatesService) {
    super(certificatesService);
  }

  @Post()
  async post(@Body() createDto: CreateCertificatesDto) {
    return await this.certificatesService.generate(createDto);
  }

  @Get()
  async fetchAll() {
    return await this.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
