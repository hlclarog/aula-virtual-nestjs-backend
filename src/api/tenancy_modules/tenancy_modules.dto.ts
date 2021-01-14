import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const TENANCY_MODULES_PROVIDER = 'TENANCY_MODULES_REPOSITORY';
export const TENANCY_MODULES_ENTITY = 'tenancy_modules';

export class CreateTenancyModulesDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly tenancy: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly module: number;
}

export class UpdateTenancyModulesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly tenancy?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly module?: number;
}
