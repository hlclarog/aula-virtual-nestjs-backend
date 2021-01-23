import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export const COURSE_UNITS_PROVIDER = 'COURSE_UNITS_REPOSITORY';
export const COURSE_UNITS_ENTITY = 'course_units';

export class CreateCourseUnitsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly color: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly order: number;
}

export class UpdateCourseUnitsDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly color?: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly order?: number;
}
