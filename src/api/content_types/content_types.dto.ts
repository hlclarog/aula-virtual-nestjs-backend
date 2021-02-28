import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const CONTENT_TYPES_PROVIDER = 'CONTENT_TYPES_REPOSITORY';
export const CONTENT_TYPES_ENTITY = 'content_types';

export enum CONTENT_TYPES_LIST {
  VIDEO = 1,
  IMAGE = 2,
  FILE = 3,
  TEXT = 4,
  SEPARATOR = 5,
  URL = 6,
  VIDEO_FILE = 7,
  AUDIO_FILE = 8,
}
export const CONTENT_TYPES_S3 = [
  CONTENT_TYPES_LIST.IMAGE,
  CONTENT_TYPES_LIST.FILE,
  CONTENT_TYPES_LIST.VIDEO_FILE,
  CONTENT_TYPES_LIST.AUDIO_FILE,
];

export class CreateContentTypesDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateContentTypesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
