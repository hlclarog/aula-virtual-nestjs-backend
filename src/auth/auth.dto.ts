import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateUsersDto } from './../api/acl/users/users.dto';

export const DEFAULT_TIME_TOKEN_AUTH = '10h';
export const DEFAULT_TIME_TOKEN_REQUEST_PASS_EMAIL = '2h';
export const DEFAULT_TIME_TOKEN_REQUEST_PASS_NUMBER = 300000;
export const MESSAGE_FORBIDDEN = 'EMAIL OR PASSWORD INCORRECT';
export const NAME_HEADER_AUTH = 'Authorization';

export class SignUpDto extends PartialType(CreateUsersDto) {}

export class LoginDto {
  @ApiProperty({ default: 'test@gmail.com' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;
  @ApiProperty({ default: '321' }) @IsString() @IsNotEmpty() password: string;
}

export class RegisterDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly lastname?: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly email: string;
  @ApiProperty() @IsString() @IsNotEmpty() password: string;
}

export class RequestPasswordEmailDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly email: string;
}
export class ChangePasswordEmailDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly access_token: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly password: string;
}
export class ChangePasswordDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly id: number;
  @ApiProperty() @IsString() @IsNotEmpty() password: string;
}
