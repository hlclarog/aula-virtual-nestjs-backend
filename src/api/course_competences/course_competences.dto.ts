import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export const COURSE_COMPETENCES_PROVIDER = 'COURSE_COMPETENCES_REPOSITORY';
export const COURSE_COMPETENCES_ENTITY = 'course_competences';

export class CreateCourseCompetencesDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly competence_id: number;
}

export class UpdateCourseCompetencesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly competence_id?: number;
}
