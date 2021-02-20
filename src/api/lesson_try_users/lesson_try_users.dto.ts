import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateBaseDto } from '../../base/base.dto';

export const ACTIVITY_TRY_USERS_PROVIDER = 'ACTIVITY_TRY_USERS_REPOSITORY';
export const ACTIVITY_TRY_USERS_ENTITY = 'lesson_try_users';

export class CreateLessonTryUsersDto extends CreateBaseDto {
  user_id?: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly lesson_id: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly begin: string;
}
export class EndLessonTryUsersDto {
  percent?: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly end: string;
}
