import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const SORT_ITEM_ANSWERS_PROVIDER = 'SORT_ITEM_ANSWERS_REPOSITORY';
export const SORT_ITEM_ANSWERS_ENTITY = 'sort_item_answers';

export class CreateSortItemAnswersDto extends CreateBaseDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly activity_sort_item: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly order?: number;
}

export class UpdateSortItemAnswersDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly activity_sort_item?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly order?: number;
}
