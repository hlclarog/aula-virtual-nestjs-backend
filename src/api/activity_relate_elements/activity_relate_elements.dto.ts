import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { RelateElementAnswers } from '../relate_element_answers/relate_element_answers.entity';

export const ACTIVITY_RELATE_ELEMENTS_PROVIDER =
  'ACTIVITY_RELATE_ELEMENTS_REPOSITORY';
export const ACTIVITY_RELATE_ELEMENTS_ENTITY = 'activity_relate_elements';

export class CreateActivityRelateElementsDto extends CreateBaseDto {
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
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly resource_type_id?: number;
}

export class UpdateActivityRelateElementsDto extends UpdateBaseDto {
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
  resource_content?: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly resource_type_id?: number;
  @ApiProperty({ required: false, isArray: true })
  @IsArray()
  @IsOptional()
  lesson_activity_detail_answers?: RelateElementAnswers[];
}
