import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HeadersTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tokenAccept: string;
}

@Injectable()
export class AuthMiddleware {}
