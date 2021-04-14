import { Inject, Injectable } from '@nestjs/common';
import {
  CreateCollectionTypesDto,
  COLLECTION_TYPES_PROVIDER,
  UpdateCollectionTypesDto,
} from './collection_types.dto';
import { BaseService } from '../../base/base.service';
import { CollectionTypes } from './collection_types.entity';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class CollectionTypesService extends BaseService<
  CollectionTypes,
  CreateCollectionTypesDto,
  UpdateCollectionTypesDto
> {
  @Inject(COLLECTION_TYPES_PROVIDER) repository: BaseRepo<CollectionTypes>;
}
