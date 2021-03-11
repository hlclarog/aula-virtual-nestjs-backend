import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export const POINT_REASON_PROVIDER = 'POINT_REASON_REPOSITORY';
export const POINT_REASON_ENTITY = 'point_reasons_value';
class SetPointReasonValueDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly point_reason_id?: number;
  @ApiProperty() @IsNumber() @IsOptional() points?: number;
}

export class SetPointReasonsValueDto {
  @ApiProperty({ type: [SetPointReasonValueDto] })
  @IsArray()
  @IsOptional()
  reasons?: SetPointReasonValueDto[];
}
