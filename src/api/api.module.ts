import { Module } from '@nestjs/common';
import { EmailTypesModule } from './email_types/email_types.module';
import { IdentificationTypesModule } from './identification_types/identification_types.module';
import { LanguagesModule } from './languages/languages.module';
import { TenancyStatusModule } from './tenancy_status/tenancy_status.module';
import { TestModule } from './test/test.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TestModule,
    UserModule,
    LanguagesModule,
    IdentificationTypesModule,
    EmailTypesModule,
    TenancyStatusModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
