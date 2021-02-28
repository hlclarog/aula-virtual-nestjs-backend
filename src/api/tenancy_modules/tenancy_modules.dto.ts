import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsArray } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const TENANCY_MODULES_PROVIDER = 'TENANCY_MODULES_REPOSITORY';
export const TENANCY_MODULES_ENTITY = 'tenancy_modules';

export class CreateTenancyModulesDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly tenancy_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly module_id: number;
}

export class UpdateTenancyModulesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly tenancy_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly module_id?: number;
}

export class CreateTenancyModulesCreateGroupDto extends CreateBaseDto {
  @ApiProperty({
    type: 'number',
    isArray: true,
    example: [1, 2, 3],
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  readonly tenancies: number[];
  @ApiProperty({
    type: 'number',
    isArray: true,
    example: [1, 2, 3],
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  readonly modules: number[];
}
