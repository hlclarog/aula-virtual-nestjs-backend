import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export const ENROLLMENT_STATUS_PROVIDER = 'ENROLLMENT_STATUS_REPOSITORY';
export const ENROLLMENT_STATUS_ENTITY = 'enrollment_status';
export class CreateEnrollmentStatusDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateEnrollmentStatusDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
