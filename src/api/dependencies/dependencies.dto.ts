import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const DEPENDENCIES_PROVIDER = 'DEPENDENCIES_REPOSITORY';
export const DEPENDENCIES_ENTITY = 'dependencies';

export class CreateDependenciesDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateDependenciesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly name?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
