import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const ACTIVITY_TYPES_PROVIDER = 'ACTIVITY_TYPES_REPOSITORY';
export const ACTIVITY_TYPES_ENTITY = 'activity_types';

export class CreateActivityTypesDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly image?: string;
}

export class UpdateActivityTypesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
