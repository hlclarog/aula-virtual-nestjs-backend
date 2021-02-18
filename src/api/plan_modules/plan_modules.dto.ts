import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const PLAN_MODULES_PROVIDER = 'PLAN_MODULES_REPOSITORY';
export const PLAN_MODULES_ENTITY = 'plan_modules';

export class CreatePlanModulesDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() plan_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() module_id: number;
}

export class UpdatePlanModulesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly plan_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly module_id?: number;
}
