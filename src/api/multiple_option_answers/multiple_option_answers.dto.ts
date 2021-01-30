import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const MULTIPLE_OPTION_ANSWERS_PROVIDER =
  'MULTIPLE_OPTION_ANSWERS_REPOSITORY';
export const MULTIPLE_OPTION_ANSWERS_ENTITY = 'multiple_option_answers';

export class CreateMultipleOptionAnswersDto extends CreateBaseDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly activity_multiple_option: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly active?: boolean;
}

export class UpdateMultipleOptionAnswersDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly activity_multiple_option?: number;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly?: string;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly active?: boolean;
}
