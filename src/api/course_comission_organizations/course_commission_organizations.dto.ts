import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const COURSE_COMMISSION_ORGANIZATIONS_PROVIDER =
  'COURSE_COMMISSION_ORGANIZATIONS_REPOSITORY';
export const COURSE_COMMISSION_ORGANIZATIONS_ENTITY =
  'course_commission_organizations';

export class CreateCourseCommissionOrganizationsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly organization_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly percentage: number;
}

export class UpdateCourseCommissionOrganizationsDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly organization_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly percentage?: number;
}
