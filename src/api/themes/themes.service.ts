import { Inject, Injectable } from '@nestjs/common';
import {
  CreateThemesDto,
  UpdateThemesDto,
  THEMES_PROVIDER,
} from './themes.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { Themes } from './themes.entity';
import { AwsService } from './../../aws/aws.service';
import * as shortid from 'shortid';
import { typeFilesAwsNames } from '../../aws/aws.dto';

@Injectable()
export class ThemesService extends BaseService<
  Themes,
  CreateThemesDto,
  UpdateThemesDto
> {
  @Inject(THEMES_PROVIDER)
  repository: BaseRepo<Themes>;

  constructor(private awsService: AwsService) {
    super();
  }

  async findAll(): Promise<Themes[]> {
    const themes = await this.repository.find();
    for (let i = 0; i < themes.length; i++) {
      const element = themes[i];
      if (element.picture) {
        element.picture = await this.awsService.getFile(element.picture);
      }
    }
    return themes;
  }

  async findOne(id: number): Promise<Themes> {
    const theme = await this.repository.findOneOrFail(id);
    if (theme.picture) {
      theme.picture = await this.awsService.getFile(theme.picture);
    }
    return theme;
  }

  async create(createDto: CreateThemesDto) {
    if (createDto.picture) {
      createDto.picture = await this.setPicture(createDto.picture);
    }
    return await this.repository.save(createDto);
  }

  async update(id: number, updateDto: UpdateThemesDto) {
    if (updateDto.picture) {
      updateDto.picture = await this.setPicture(updateDto.picture);
    }
    return await this.repository.update(id, updateDto);
  }

  async setPicture(file) {
    const result = await this.awsService.saveFile({
      file,
      name: shortid.generate(),
      type: typeFilesAwsNames.themes_pictures,
    });
    return result.Key;
  }
}
