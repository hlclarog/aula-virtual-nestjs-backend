import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';

export const COURSE_PROVIDER = 'COURSE_REPOSITORY';
export const COURSE_ENTITY = 'Courses';
export class CreateCourseDto extends CreateBaseDto {
  @ApiProperty({ type: String, required: true }) readonly name: string;
  @ApiProperty({ type: String }) readonly description: string;
  @ApiProperty({ type: String }) readonly short_name: string;
  @ApiProperty({ type: Number }) readonly organization_id: number;
  @ApiProperty({ type: Number }) readonly user_id: number;
  @ApiProperty({ type: Boolean }) readonly free: boolean;
  @ApiProperty({ type: Boolean }) readonly certificable: boolean;
}
export class UpdateCourseDto extends UpdateBaseDto {
  @ApiProperty({ type: String, required: true }) readonly name?: string;
  @ApiProperty({ type: String }) readonly description?: string;
  @ApiProperty({ type: String }) readonly short_name?: string;
  @ApiProperty({ type: Number }) readonly organization_id?: number;
  @ApiProperty({ type: Number }) readonly user_id?: number;
  @ApiProperty({ type: Boolean }) readonly free?: boolean;
  @ApiProperty({ type: Boolean }) readonly certificable?: boolean;
}
