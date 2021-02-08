import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { SortItemAnswers } from '../sort_item_answers/sort_item_answers.entity';

export const ACTIVITY_SORT_ITEMS_PROVIDER = 'ACTIVITY_SORT_ITEMS_REPOSITORY';
export const ACTIVITY_SORT_ITEMS_ENTITY = 'activity_sort_items';

export class CreateActivitySortItemsDto extends CreateBaseDto {
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
  readonly resource_type?: number;
}

export class UpdateActivitySortItemsDto extends UpdateBaseDto {
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
  readonly resource_type?: number;
  @ApiProperty({ required: false, isArray: true })
  @IsArray()
  @IsOptional()
  lesson_activity_detail_answers?: SortItemAnswers[];
}
