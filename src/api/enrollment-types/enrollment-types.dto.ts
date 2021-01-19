import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export const ENROLLMENT_TYPES_PROVIDER = 'ENROLLMENT_TYPES_REPOSITORY';
export const ENROLLMENT_TYPES_ENTITY = 'enrollment_types';
export class CreateEnrollmentTypesDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateEnrollmentTypesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
