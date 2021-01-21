import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const PROGRAM_COMMISSION_ORGANIZATIONS_PROVIDER =
  'PROGRAM_COMMISSION_ORGANIZATIONS_REPOSITORY';
export const PROGRAM_COMMISSION_ORGANIZATIONS_ENTITY =
  'program_commission_organizations';

export class CreateProgramCommissionOrganizationsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly program: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly organization: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly percentage: number;
}

export class UpdateProgramCommissionOrganizationsDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly program?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly organization?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly percentage?: number;
}
