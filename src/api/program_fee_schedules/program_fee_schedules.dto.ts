import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export const PROGRAM_FEE_SCHEDULE_PROVIDER = 'PROGRAM_FEE_SCHEDULE_REPOSITORY';
export const PROGRAM_FEE_SCHEDULE_ENTITY = 'program_fee_schedules';

export class CreateProgramFeeSchedulesDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly currency_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly program_id: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly begin: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly end?: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly program_val: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly inscription_val: number;
}

export class UpdateProgramFeeSchedulesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly currency_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly program_id?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly begin?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly end?: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly program_val?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly inscription_val?: number;
}
