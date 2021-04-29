import { Inject, Injectable } from '@nestjs/common';
import {
  CreateSlidersDto,
  SLIDERS_PROVIDER,
  UpdateSlidersDto,
} from './sliders.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { Sliders } from './sliders.entity';
import { AwsService } from '../../aws/aws.service';
import { durationFilesUrl, typeFilesAwsNames } from '../../aws/aws.dto';
import shortid from 'shortid';
import { UpdateResult } from 'typeorm';

@Injectable()
export class SlidersService extends BaseService<
  Sliders,
  CreateSlidersDto,
  UpdateSlidersDto
> {
  @Inject(SLIDERS_PROVIDER) repository: BaseRepo<Sliders>;

  constructor(private readonly awsService: AwsService) {
    super();
  }

  async findOne(id: number): Promise<Sliders> {
    const slider = await this.repository.findOneOrFail(id, {
      relations: ['banners'],
    });
    if (slider.image) {
      slider.image = await this.awsService.getFile(
        slider.image,
        durationFilesUrl.images_tenancy,
      );
    }
    return slider;
  }

  async create(createDto: CreateSlidersDto) {
    if (createDto.image) {
      createDto.image = await this.setImage(createDto.image);
    }
    return await this.repository.save(createDto);
  }

  async update(id: number, updateDto: UpdateSlidersDto): Promise<UpdateResult> {
    if (updateDto.image) {
      updateDto.image = await this.setImage(updateDto.image);
    }
    return await this.repository.update(id, updateDto);
  }

  async setImage(file) {
    const result = await this.awsService.saveFile({
      file,
      name: shortid.generate(),
      type: typeFilesAwsNames.banners_sliders,
    });
    return result.Key;
  }
}
