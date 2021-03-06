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
    return await this.repository
      .createQueryBuilder('config')
      .select([
        'config.id',
        'config.tenancy_id',
        'config.theme_id',
        'config.rol_default_id',
        'config.title',
        'config.web_client_oauth',
        'config.short_name',
        'config.message_welcome',
        'config.image_small',
        'config.image_big',
        'config.allow_registration',
        'theme.id',
        'theme.code',
        'theme.description',
        'theme.picture',
        'tenancy.id',
        'tenancy.name',
        'tenancy.alias',
        'rol_default.id',
        'rol_default.name',
        'rol_default.display_name',
      ])
      .leftJoin('config.theme', 'theme')
      .leftJoin('config.tenancy', 'tenancy')
      .leftJoin('config.rol_default', 'rol_default')
      .where('tenancy_id = :id', { id })
      .getOne();
  }

  async update(id: number, updateDto: SetTenancyConfigDto) {
    let data = await this.findOne(id);
    if (data) {
      await this.repository.update(data.id, updateDto);
    } else {
      await this.repository.save({ ...updateDto, tenancy_id: id });
    }
    data = await this.findOne(id);
    return data;
  }
}
