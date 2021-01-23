import { Inject, Injectable } from '@nestjs/common';
import {
  CreateContentTypesDto,
  UpdateContentTypesDto,
  CONTENT_TYPES_PROVIDER,
} from './content_types.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ContentTypes } from './content_types.entity';

@Injectable()
export class ContentTypesService extends BaseService<
  ContentTypes,
  CreateContentTypesDto,
  UpdateContentTypesDto
> {
  @Inject(CONTENT_TYPES_PROVIDER) repository: BaseRepo<ContentTypes>;
}
