import { Module } from '@nestjs/common';
import { EmailTemplatesModule } from './email_templates/email_templates.module';
import { EmailActivitiesModule } from './email_activities/email_activities.module';
import { IdentificationTypesModule } from './identification_types/identification_types.module';
import { LanguagesModule } from './languages/languages.module';
import { TenancyStatusModule } from './tenancy_status/tenancy_status.module';
import { TestModule } from './test/test.module';
import { UserModule } from './user/user.module';
import { EmailActivitiesTemplateModule } from './email_activities_template/email_activities_template.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    TestModule,
    UserModule,
    LanguagesModule,
    IdentificationTypesModule,
    TenancyStatusModule,
    EmailTemplatesModule,
    EmailActivitiesModule,
    EmailActivitiesTemplateModule,
    ClientsModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
