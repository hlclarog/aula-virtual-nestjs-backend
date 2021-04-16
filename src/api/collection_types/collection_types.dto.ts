import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export const COLLECTION_TYPES_PROVIDER = 'COLLECTION_TYPES_REPOSITORY';
export const COLLECTION_TYPES_ENTITY = 'collection_types';
export enum COLLECTION_TYPES_ENUM {
  INTERNAL = 1,
  EXTERNAL = 2,
}
export class CreateCollectionTypesDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}
export class UpdateCollectionTypesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
