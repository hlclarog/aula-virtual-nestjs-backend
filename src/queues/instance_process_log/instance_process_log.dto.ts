import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export const INSTANCE_PROCESS_LOG_PROVIDER = 'INSTANCE_PROCESS_LOG_COLLECTION';

export class SetInstanceProcessDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly tenant: string;
}

export class SetRegisterStatusInstanceProcessDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly tenant: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly status_register: boolean;
}
export class SetSubdomineStatusInstanceProcessDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly tenant: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly status_subdominie: boolean;
}
export class SetVirtualhostStatusInstanceProcessDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly tenant: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly status_virtualhost: boolean;
}
export class SetSchemaStatusInstanceProcessDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly tenant: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly status_schema: boolean;
}
