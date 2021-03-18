import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const POINT_REASONS_PROVIDER = 'POINT_REASONS_REPOSITORY';
export const POINT_REASONS_ENTITY = 'point_reasons';

export class CreatePointReasonsDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly private: boolean;
}

export class UpdatePointReasonsDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly private?: boolean;
}
