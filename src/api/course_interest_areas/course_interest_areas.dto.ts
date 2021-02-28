import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export const COURSE_INTEREST_AREAS_PROVIDER =
  'COURSE_INTEREST_AREAS_REPOSITORY';
export const COURSE_INTEREST_AREAS_ENTITY = 'course_interest_areas';
export class CreateCourseInterestAreasDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly interest_area_id: number;
}

export class UpdateCourseInterestAreasDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly interest_area_id?: number;
}
