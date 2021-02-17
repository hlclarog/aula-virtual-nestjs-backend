import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export const COMPETENCES_PROVIDER = 'COMPETENCE_REPOSITORY';
export const COMPETENCES_ENTITY = 'competences';

export class CreateCompentenceDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty({ required: true }) @IsNumber() readonly competence_type_id: number;
}
export class UpdateCompetenceDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly competence_type_id: number;
}
