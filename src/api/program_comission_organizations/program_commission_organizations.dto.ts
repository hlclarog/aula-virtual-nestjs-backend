import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const PROGRAM_COMMISSION_ORGANIZATIONS_PROVIDER =
  'PROGRAM_COMMISSION_ORGANIZATIONS_REPOSITORY';
export const PROGRAM_COMMISSION_ORGANIZATIONS_ENTITY =
  'program_commission_organizations';

export class CreateProgramCommissionOrganizationsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly program_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly organization_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly percentage: number;
}

export class UpdateProgramCommissionOrganizationsDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly program_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly organization_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly percentage?: number;
}
