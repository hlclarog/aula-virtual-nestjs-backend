import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const SLIDERS_PROVIDER = 'SLIDERS_REPOSITORY';
export const SLIDERS_ENTITY = 'sliders';

export class CreateSlidersDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly banner_id: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly content?: string;
  @ApiProperty() @IsString() @IsNotEmpty() image: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly link?: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly order?: number;
}

export class UpdateSlidersDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly banner_id?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly content?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  image?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly link?: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly order?: number;
}
