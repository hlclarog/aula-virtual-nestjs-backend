import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const PROGRAM_STATUS_PROVIDER = 'PROGRAM_STATUS_REPOSITORY';
export const PROGRAM_STATUS_ENTITY = 'course_comission_organizations';

export class CreateCourseComissionOrganizationsDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateCourseComissionOrganizationsDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
