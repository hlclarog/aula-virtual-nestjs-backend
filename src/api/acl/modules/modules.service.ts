import { Inject, Injectable } from '@nestjs/common';
import {
  CreateModulesDto,
  UpdateModulesDto,
  MODULES_PROVIDER,
} from './modules.dto';
import { BaseService } from '../../../base/base.service';
import { BaseRepo } from '../../../base/base.repository';
import { Modules } from './modules.entity';
import { durationFilesUrl } from '../../../aws/aws.dto';
import { AwsService } from '../../../aws/aws.service';

@Injectable()
export class ModulesService extends BaseService<
  Modules,
  CreateModulesDto,
  UpdateModulesDto
> {
  @Inject(MODULES_PROVIDER) repository: BaseRepo<Modules>;

  constructor(private readonly awsService: AwsService) {
    super();
  }

  async findAll(): Promise<Modules[]> {
    return await this.repository.find({
      relations: ['parent', 'parent.parent'],
      join: {
        alias: 'modules',
        leftJoinAndSelect: { permissions: 'modules.permissions' },
      },
      where: (qb) => {
        qb.where('permissions.deleted_at is null', {});
      },
    });
  }

  async findOne(id: number): Promise<Modules> {
    return this.repository.findOneOrFail(id, {
      relations: ['parent', 'parent.parent', 'children', 'children.parent'],
      join: {
        alias: 'modules',
        leftJoinAndSelect: { permissions: 'modules.permissions' },
      },
      where: (qb) => {
        qb.where('permissions.deleted_at is null', {});
      },
    });
  }

  async getBannerByModule(id: number): Promise<Modules> {
    const result: Modules = await this.repository
      .createQueryBuilder('modules')
      .select(['modules.id', 'banners.description', 'sliders'])
      .where('modules.id = :id', { id })
      .leftJoinAndSelect('modules.banners', 'banners')
      .leftJoinAndSelect('banners.sliders', 'sliders')
      .getOneOrFail();

    if (result?.banners?.sliders) {
      result.banners.sliders.map(async (slider) => {
        if (slider.image) {
          slider.image = await this.awsService.getFile(
            slider.image,
            durationFilesUrl.images_tenancy,
          );
        }
      });
    }

    return result;
  }
}
