import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export const COURSE_PROVIDER = 'COURSE_REPOSITORY';
export const COURSE_ENTITY = 'courses';
export class CreateCourseDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly short_name: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly organization_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly user_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_status_id: number;
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly free: boolean;
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly certificable: boolean;
}
export class UpdateCourseDto extends UpdateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly name?: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description?: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly short_name?: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly organization_id?: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly user_id?: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_status_id?: number;
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly free?: boolean;
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly certificable?: boolean;
}
