import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const USERS_COMPETENCES_PROVIDER = 'USERS_COMPETENCES_REPOSITORY';
export const USERS_COMPETENCES_ENTITY = 'users_competences';

export class CreateUsersCompetencesDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly user_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly competence_id: number;
}

export class UpdateUsersCompetencesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly user_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly competence_id?: number;
}
