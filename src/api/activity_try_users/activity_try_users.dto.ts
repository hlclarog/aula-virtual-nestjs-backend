import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto } from '../../base/base.dto';

export const ACTIVITY_TRY_USERS_PROVIDER = 'ACTIVITY_TRY_USERS_REPOSITORY';
export const ACTIVITY_TRY_USERS_ENTITY = 'activity_try_users';

export class CreateActivityTryUsersDto extends CreateBaseDto {
  user_id?: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly lesson_activity_id: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly begin: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly end?: string;
}
export class EndActivityTryUsersDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly end: string;
}
