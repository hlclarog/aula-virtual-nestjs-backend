import { Module } from '@nestjs/common';
import { EmailTemplatesModule } from './email_templates/email_templates.module';
import { EmailActivitiesModule } from './email_activities/email_activities.module';
import { IdentificationTypesModule } from './identification_types/identification_types.module';
import { LanguagesModule } from './languages/languages.module';
import { TenancyStatusModule } from './tenancy_status/tenancy_status.module';
import { TestModule } from './test/test.module';
import { EmailActivitiesTemplateModule } from './email_activities_template/email_activities_template.module';
import { ClientsModule } from './clients/clients.module';
import { TenanciesModule } from './tenancies/tenancies.module';
import { TenancyLanguagesModule } from './tenancy_languages/tenancy_languages.module';
import { TenancyEmailsModule } from './tenancy_emails/tenancy_emails.module';
import { TenancyDomainsModule } from './tenancy_domains/tenancy_domains.module';
import { UsersModule } from './acl/users/users.module';
import { ModulesModule } from './acl/modules/modules.module';
import { PermissionsModule } from './acl/permissions/permissions.module';
import { RolesModule } from './acl/roles/roles.module';
import { RolesPermissionsModule } from './acl/roles_permissions/roles_permissions.module';
import { UsersRolesModule } from './acl/users_roles/users_roles.module';
import { InfoUserModule } from '../utils/providers/info-user.module';
import { ServersModule } from './instance/servers/servers.module';
import { ServerTypesModule } from './instance/server_types/server_types.module';
import { ConnectionTypesModule } from './instance/connection_types/connection_types.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { CompetenceTypesModule } from './competence-types/competence-types.module';
import { CompetencesModule } from './competences/competences.module';
import { CourseStatusModule } from './course-status/course-status.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { CoursesModule } from './courses/courses.module';
import { CourseFeeScheduleModule } from './course-fee-schedule/course-fee-schedule.module';




@Module({
  imports: [
    InfoUserModule.forRoot(),
    TestModule,
    LanguagesModule,
    IdentificationTypesModule,
    TenancyStatusModule,
    EmailTemplatesModule,
    EmailActivitiesModule,
    EmailActivitiesTemplateModule,
    ClientsModule,
    TenanciesModule,
    TenancyLanguagesModule,
    TenancyEmailsModule,
    TenancyDomainsModule,
    ModulesModule,
    PermissionsModule,
    RolesModule,
    RolesPermissionsModule,
    UsersModule,
    UsersRolesModule,
    ServersModule,
    ServerTypesModule,
    ConnectionTypesModule,
    OrganizationsModule,
    CompetenceTypesModule,
    CompetencesModule,
    CourseStatusModule,
    CurrenciesModule,
    CoursesModule,
    CourseFeeScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
