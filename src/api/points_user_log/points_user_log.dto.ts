import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto } from '../../base/base.dto';

export const POINTS_USER_LOG_PROVIDER = 'POINTS_USER_LOG_REPOSITORY';
export const POINTS_USER_LOG_ENTITY = 'points_user_log';

export enum TypesReasonsPoints {
  INITIAL_POINTS = 1,
  TEORIC_LESSON_END = 2,
  FORUM_LESSON_END = 3,
  ACTIVITY_END = 4,
  PRACTICE_LESSON_END = 5,
  VIEW_ANSWER = 6,
  BUY_LIVES = 7,

  LOGIN = 8,
  LOGOUT = 9,
  LESSON_INIT = 10,
  COURSE_INIT = 11,
  COURSE_END = 12,
  SHARE_CONTENT = 13,
  DOWNLOAD_CERTIFICATE = 14,
}

export enum POINTS_USER_LOG_PERMISSIONS {
  GET_ALL_POINTS = 'get-all-points-students',
}

export interface PointsGerenerated {
  user_id: number;
  points: number;
  lives: number;
  generated: {
    points: number;
    lives: number;
  };
}

export class CreatePointsUserLogDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly user_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly point_reason_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly points: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course_lesson_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly activity_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly lives?: number;
}

export class FilterPointsUserLogDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  user_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly point_reason_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course_lesson_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly activity_id?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly begin?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly end?: string;
}

export class BuyLivesDto {
  user_id: number;
  @ApiProperty({ enum: [2, 4, 6] })
  @IsNumber()
  @IsNotEmpty()
  readonly lives: number;
}
