import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const RELATE_ELEMENT_ANSWERS_PROVIDER =
  'RELATE_ELEMENT_ANSWERS_REPOSITORY';
export const RELATE_ELEMENT_ANSWERS_ENTITY = 'relate_element_answers';

export class CreateRelateElementAnswersDto extends CreateBaseDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly activity_relate_element: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly term?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly definition?: string;
}

export class UpdateRelateElementAnswersDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly activity_relate_element?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly term?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly definition?: string;
}
