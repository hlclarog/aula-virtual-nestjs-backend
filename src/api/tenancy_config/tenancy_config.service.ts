import { Inject, Injectable } from '@nestjs/common';
import {
  SetTenancyConfigDto,
  TENANCY_CONFIG_PROVIDER,
} from './tenancy_config.dto';
import { BaseRepo } from '../../base/base.repository';
import { TenancyConfig } from './tenancy_config.entity';
import { AwsService } from './../../aws/aws.service';
import * as shortid from 'shortid';
import { typeFilesAwsNames } from './../../aws/aws.dto';

@Injectable()
export class TenancyConfigService {
  @Inject(TENANCY_CONFIG_PROVIDER) repository: BaseRepo<TenancyConfig>;

  constructor(private awsService: AwsService) {}

  async findOne(id: number): Promise<TenancyConfig> {
    const config: TenancyConfig = await this.repository
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
        'credentials.description',
        'credentials.client_id',
        'credentials.type',
      ])
      .leftJoin('config.theme', 'theme')
      .leftJoin('config.tenancy', 'tenancy')
      .leftJoin('config.rol_default', 'rol_default')
      .leftJoin('tenancy.tenancy_oauth2_credentials', 'credentials')
      .where('config.tenancy_id = :id', { id })
      .getOne();
    const listCredentials = config.tenancy.tenancy_oauth2_credentials.map(
      (t) => t.type,
    );
    const list = {};
    for (let i = 0; i < listCredentials.length; i++) {
      const element = listCredentials[i];
      list[element] = true;
    }
    config['external_credentials'] = list;

    if (config.image_small) {
      config.image_small = await this.awsService.getFile(config.image_small);
    }
    if (config.image_big) {
      config.image_big = await this.awsService.getFile(config.image_big);
    }
    return config;
  }

  async update(id: number, updateDto: SetTenancyConfigDto) {
    const info = Object.assign({}, updateDto);
    let data = await this.findOne(id);
    if (info.image_big) {
      info.image_big = await this.setPicture(info.image_big);
    } else {
      delete info.image_big;
    }
    if (info.image_small) {
      info.image_small = await this.setPicture(info.image_small);
    } else {
      delete info.image_small;
    }
    if (data) {
      await this.repository.update(data.id, info);
    } else {
      await this.repository.save({ ...info, tenancy_id: id });
    }
    data = await this.findOne(id);
    return data;
  }
  async setPicture(file) {
    const result = await this.awsService.saveFile({
      file,
      name: shortid.generate(),
      type: typeFilesAwsNames.tenancy_pictures,
    });
    return result.Key;
  }
}
