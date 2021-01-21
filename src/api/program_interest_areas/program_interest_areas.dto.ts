import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export const PROGRAM_INTEREST_AREAS_PROVIDER =
  'PROGRAM_INTEREST_AREAS_REPOSITORY';
export const PROGRAM_INTEREST_AREAS_ENTITY = 'program_interest_areas';
export class CreateProgramInterestAreasDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly program: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly interest_area: number;
}

export class UpdateProgramInterestAreasDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly program?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly interest_area?: number;
}
