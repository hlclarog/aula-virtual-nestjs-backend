import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const LESSON_DETAILS_PROVIDER = 'LESSON_DETAILS_REPOSITORY';
export const LESSON_DETAILS_ENTITY = 'lesson_details';

export class CreateLessonDetailsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly lesson: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly content_type: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly content: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly order: number;
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly visible: boolean;
}

export class UpdateLessonDetailsDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly lesson?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly content_type?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly content?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly order?: number;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly visible?: boolean;
}

export class UpdateOrderLessonDetailsDto extends UpdateBaseDto {
  @ApiProperty({
    type: 'number',
    isArray: true,
    example: [1, 2, 3],
    required: false,
  })
  @IsArray()
  @IsOptional()
  details?: number[];
}
