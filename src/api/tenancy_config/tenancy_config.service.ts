import { Inject, Injectable } from '@nestjs/common';
import {
  SetTenancyConfigDto,
  TENANCY_CONFIG_PROVIDER,
} from './tenancy_config.dto';
import { BaseRepo } from '../../base/base.repository';
import { TenancyConfig } from './tenancy_config.entity';

@Injectable()
export class TenancyConfigService {
  @Inject(TENANCY_CONFIG_PROVIDER) repository: BaseRepo<TenancyConfig>;

  async findOne(id: number): Promise<TenancyConfig> {
    return this.repository.findOne({
      where: {
        tenancy: id,
      },
      relations: ['theme', 'tenancy', 'rol_default'],
    });
  }

  async update(id: number, updateDto: SetTenancyConfigDto) {
    let data = await this.findOne(id);
    if (data) {
      await this.repository.update(data.id, updateDto);
    } else {
      await this.repository.save({ ...updateDto, tenancy: id });
    }
    data = await this.findOne(id);
    return data;
  }
}
