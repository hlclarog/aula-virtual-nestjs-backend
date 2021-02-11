import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const ACTIVITY_IDENTIFY_WORDS_PROVIDER =
  'ACTIVITY_IDENTIFY_WORDS_REPOSITORY';
export const ACTIVITY_IDENTIFY_WORDS_ENTITY = 'activity_identify_words';

export class CreateActivityIdentifyWordsDto extends CreateBaseDto {
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
  readonly word?: string;
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
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly resource_type?: number;
}

export class UpdateActivityIdentifyWordsDto extends UpdateBaseDto {
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
  readonly word?: string;
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
  resource_content?: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly resource_type?: number;
}
