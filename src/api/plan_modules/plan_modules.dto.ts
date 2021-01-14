import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const PLAN_MODULES_PROVIDER = 'PLAN_MODULES_REPOSITORY';
export const PLAN_MODULES_ENTITY = 'plan_modules';

export class CreatePlanModulesDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() plan: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() module: number;
}

export class UpdatePlanModulesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly plan?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly module?: number;
}
