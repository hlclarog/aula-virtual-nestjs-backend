import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateBaseDto } from '../../base/base.dto';

export const ORGANIZATIONS_PROVIDER = 'ORGANIZATIONS_REPOSITORY';
export const ORGANIZATIONS_ENTITY = 'certificates';

export enum TypesCertificates {
  COURSE = 'course',
  PROGRAM = 'program',
}

export class CreateCertificatesDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly organization_id: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly reference_type: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly reference_id: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly certification_validate_code: string;
}

export class CreateCertificatesDemoDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly organization_id: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly reference_type: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly reference_id: number;
}
