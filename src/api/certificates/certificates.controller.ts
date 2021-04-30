import { Body, Delete, Get, Param, Post } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import {
  CreateCertificatesDemoDto,
  CreateCertificatesDto,
} from './certificates.dto';
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

  @Post('demo')
  async demo(@Body() createDto: CreateCertificatesDemoDto) {
    return await this.certificatesService.generateDemo(createDto);
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
