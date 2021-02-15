import { Body, Get, Inject, Put } from '@nestjs/common';
import { TenancyConfigService } from './tenancy_config.service';
import { SetTenancyConfigDto } from './tenancy_config.dto';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import {
  INFO_TENANCY_PROVIDER,
  InfoTenancyDomain,
} from './../../utils/providers/info-tenancy.module';

@ControllerApi({ name: 'tenancy_config' })
export class TenancyConfigController {
  constructor(
    private tenancy_configService: TenancyConfigService,
    @Inject(INFO_TENANCY_PROVIDER) private tenancy: InfoTenancyDomain,
  ) {}

  @Get()
  async fetch() {
    const reuslt = await this.tenancy_configService.findOne(this.tenancy.id);
    return { data: reuslt ? reuslt : {} };
  }
  @Put('')
  async edit(@Body() updateDto: SetTenancyConfigDto) {
    const reuslt = await this.tenancy_configService.update(
      this.tenancy.id,
      updateDto,
    );
    return { data: reuslt };
  }
}
