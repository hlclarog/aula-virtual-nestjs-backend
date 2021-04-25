import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const POSITIONS_COMPETENCES_PROVIDER =
  'POSITIONS_COMPETENCES_REPOSITORY';
export const POSITIONS_COMPETENCES_ENTITY = 'position_competences';

export class CreatePositionCompetencesDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly position: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly competence_id: number;
}

export class UpdatePositionCompetencesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly position?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly competence_id?: number;
}
