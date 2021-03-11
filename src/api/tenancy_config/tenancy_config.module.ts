import { Module } from '@nestjs/common';
import { TenancyConfigService } from './tenancy_config.service';
import { TenancyConfigController } from './tenancy_config.controller';
import { Connection } from 'typeorm';
import { TENANCY_CONFIG_PROVIDER } from './tenancy_config.dto';
import { TenancyConfig } from './tenancy_config.entity';
import { DATABASE_TENANCY_PROVIDER } from './../../database/database.dto';
import { AwsModule } from './../../aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [TenancyConfigController],
  providers: [
    {
      provide: TENANCY_CONFIG_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(TenancyConfig),
    },
    TenancyConfigService,
  ],
  exports: [TENANCY_CONFIG_PROVIDER, TenancyConfigService],
})
export class TenancyConfigModule {}
