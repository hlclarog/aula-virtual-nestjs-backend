import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export const COMPETENCE_TYPES_PROVIDER = 'COMPETENCE_TYPES_REPOSITORY';
export const COMPETENCE_TYPES_ENTITY = 'competence_types';

export class CreateCompetenceTypeDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}
export class UpdateCompetenceTypeDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
