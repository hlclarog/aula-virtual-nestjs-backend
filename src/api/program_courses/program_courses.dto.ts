import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const PROGRAM_COURSES_PROVIDER = 'PROGRAM_COURSES_REPOSITORY';
export const PROGRAM_COURSES_ENTITY = 'program_courses';

export class CreateProgramCoursesDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly user: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly program: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly transaction_status: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly paid_reference: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly begin_date: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly end_date: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly ref_transaction: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly paid_value: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly certificate_file: string;
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly downloaded: boolean;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly certificate_code_validation: string;
}

export class UpdateProgramCoursesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly user?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly program?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly transaction_status?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly paid_reference?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly begin_date?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly end_date?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly ref_transaction?: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly paid_value?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly certificate_file?: string;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly downloaded?: boolean;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly certificate_code_validation?: string;
}
