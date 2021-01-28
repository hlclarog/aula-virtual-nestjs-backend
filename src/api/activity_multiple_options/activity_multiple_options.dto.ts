import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const ACTIVITY_MULTIPLE_OPTIONS_PROVIDER =
  'ACTIVITY_MULTIPLE_OPTIONS_REPOSITORY';
export const ACTIVITY_MULTIPLE_OPTIONS_ENTITY = 'activity_multiple_options';

export class CreateActivityMultipleOptionsDto extends CreateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly statement?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly observation?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly picture?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly video?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly audio?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly resource_content?: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly resource_type: number;
}

export class UpdateActivityMultipleOptionsDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly statement?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly observation?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly picture?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly video?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly audio?: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly resource_type?: number;
}
