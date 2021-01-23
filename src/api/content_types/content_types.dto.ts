import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const CONTENT_TYPES_PROVIDER = 'CONTENT_TYPES_REPOSITORY';
export const CONTENT_TYPES_ENTITY = 'content_types';

export class CreateContentTypesDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateContentTypesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
