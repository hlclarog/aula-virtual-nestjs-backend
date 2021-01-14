import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export const COURSE_PROVIDER = 'COURSE_REPOSITORY';
export const COURSE_ENTITY = 'courses';
export class CreateCourseDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly short_name: string;
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly free: boolean;
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly certifiable: boolean;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly organization: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly user: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_status: number;
}
export class UpdateCourseDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  readonly short_name: string;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsNotEmpty()
  readonly free: boolean;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsNotEmpty()
  readonly certifiable: boolean;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsNotEmpty()
  readonly organization: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsNotEmpty()
  readonly user: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsNotEmpty()
  readonly course_status: number;
}
