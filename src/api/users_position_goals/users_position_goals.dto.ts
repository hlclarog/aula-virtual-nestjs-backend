import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const USERS_POSITION_GOALS_PROVIDER = 'USERS_POSITION_GOALS_REPOSITORY';
export const USERS_POSITION_GOALS_ENTITY = 'users_position_goals';

export class CreateUsersPositionGoalsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly user_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly position_id: number;
}

export class UpdateUsersPositionGoalsDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly user_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly position_id?: number;
}
