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
import { PlansModule } from './plans/plans.module';
import { PlanModulesModule } from './plan_modules/plan_modules.module';
import { TenancyModulesModule } from './tenancy_modules/tenancy_modules.module';
import { CompetenceTypesModule } from './competence-types/competence-types.module';
import { CompetencesModule } from './competences/competences.module';
import { CourseStatusModule } from './course-status/course-status.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { CoursesModule } from './courses/courses.module';
import { CourseFeeScheduleModule } from './course-fee-schedule/course-fee-schedule.module';
import { ProgramsModule } from './programs/programs.module';
import { EnrollmentStatusModule } from './enrollment-status/enrollment-status.module';
import { CourseUsersModule } from './course-users/course-users.module';
import { TransactionStatusModule } from './transaction_status/transaction_status.module';
import { ProgramTypesModule } from './program_types/program_types.module';
import { ProgramStatusModule } from './program_status/program_status.module';
import { ProgramFeeSchedulesModule } from './program_fee_schedules/program_fee_schedules.module';
import { ProgramCoursesModule } from './program_courses/program_courses.module';
import { ProgramUsersModule } from './program_users/program_users.module';
import { InterestAreasModule } from './interest_areas/interest_areas.module';
import { ProgramInterestAreasModule } from './program_interest_areas/program_interest_areas.module';
import { CourseInterestAreasModule } from './course_interest_areas/course_interest_areas.module';
import { CourseCompetencesModule } from './course_competences/course_competences.module';
import { ProgramCommissionOrganizationsModule } from './program_comission_organizations/program_commission_organizations.module';
import { CourseCommissionOrganizationsModule } from './course_comission_organizations/course_commission_organizations.module';
import { CourseUnitsModule } from './course_units/course_units.module';
import { LessonTypesModule } from './lesson_types/lesson_types.module';
import { ActivityTypesModule } from './activity_types/activity_types.module';
import { ContentTypesModule } from './content_types/content_types.module';
import { LessonsModule } from './lessons/lessons.module';
import { LessonDetailsModule } from './lesson_details/lesson_details.module';
import { LessonActivitiesModule } from './lesson_activities/lesson_activities.module';
import { S3ProviderModule } from '../aws/providers/s3.provider';
import { LessonScormsModule } from './lesson_scorms/lesson_scorms.module';
import { LessonScormResourcesModule } from './lesson_scorm_resources/lesson_scorm_resources.module';
import { LessonScormIntentsModule } from './lesson_scorm_intents/lesson_scorm_intents.module';
import { LessonScormDetailsModule } from './lesson_scorm_details/lesson_scorm_details.module';
import { ActivityMultipleOptionsModule } from './activity_multiple_options/activity_multiple_options.module';
import { ResourceTypesModule } from './resource_types/resource_types.module';
import { MultipleOptionAnswersModule } from './multiple_option_answers/multiple_option_answers.module';
import { ActivitySortItemsModule } from './activity_sort_items/activity_sort_items.module';
import { SortItemAnswersModule } from './sort_item_answers/sort_item_answers.module';
import { ActivityRelateElementsModule } from './activity_relate_elements/activity_relate_elements.module';
import { RelateElementAnswersModule } from './relate_element_answers/relate_element_answers.module';
import { ActivityCompleteTextsModule } from './activity_complete_texts/activity_complete_texts.module';
import { ActivityIdentifyWordsModule } from './activity_identify_words/activity_identify_words.module';
import { ActivityTryUsersModule } from './activity_try_users/activity_try_users.module';
import { ActivityTriesModule } from './activity_tries/activity_tries.module';
import { TenancyConfigModule } from './tenancy_config/tenancy_config.module';
import { ThemesModule } from './themes/themes.module';
import { LessonTryUsersModule } from './lesson_try_users/lesson_try_users.module';
import { LessonCommentsModule } from './lesson_comments/lesson_comments.module';
import { LessonCommentReactionsModule } from './lesson_comment_reactions/lesson_comment_reactions.module';
import { TenancyOauth2CredentialsModule } from './tenancy_oauth2_credentials/tenancy_oauth2_credentials.module';
import { PointReasonsModule } from './point_reasons/point_reasons.module';
import { PointsUserLogModule } from './points_user_log/points_user_log.module';
import { PointReasonsValueModule } from './point_reasons_value/point_reasons_value.module';
import { IntegrationTypesModule } from './integration_types/integration_types.module';
import { ProgramCoursesStatusModule } from './program_courses_status/program_courses_status.module';
import { CourseLessonsModule } from './course_lessons/course_lessons.module';
import { LessonPermissionTypesModule } from './lesson_permission_types/lesson_permission_types.module';
import { CollectionTypesModule } from './collection_types/collection_types.module';
import { PaymentStatusModule } from './payment_status/payment_status.module';
import { PaymentsModule } from './payments/payments.module';
import { ProgramPaymentModule } from './program_payment/program_payment.module';
import { UsersOrganizationsModule } from './users_organizations/users_organizations.module';

@Module({
  imports: [
    InfoUserModule.forRoot(),
    S3ProviderModule.forRoot(),
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
    PlansModule,
    PlanModulesModule,
    TenancyModulesModule,
    CompetenceTypesModule,
    CompetencesModule,
    CourseStatusModule,
    CurrenciesModule,
    CoursesModule,
    CourseFeeScheduleModule,
    ProgramsModule,
    EnrollmentStatusModule,
    CourseUsersModule,
    TransactionStatusModule,
    ProgramTypesModule,
    ProgramStatusModule,
    ProgramFeeSchedulesModule,
    ProgramCoursesModule,
    ProgramUsersModule,
    ProgramInterestAreasModule,
    InterestAreasModule,
    CourseInterestAreasModule,
    CourseCompetencesModule,
    ProgramCommissionOrganizationsModule,
    CourseCommissionOrganizationsModule,
    CourseUnitsModule,
    LessonTypesModule,
    ActivityTypesModule,
    ContentTypesModule,
    LessonsModule,
    LessonDetailsModule,
    LessonScormsModule,
    LessonScormIntentsModule,
    LessonScormResourcesModule,
    LessonScormDetailsModule,
    LessonActivitiesModule,
    ResourceTypesModule,
    ActivityMultipleOptionsModule,
    MultipleOptionAnswersModule,
    ActivitySortItemsModule,
    SortItemAnswersModule,
    ActivityRelateElementsModule,
    RelateElementAnswersModule,
    ActivityCompleteTextsModule,
    ActivityIdentifyWordsModule,
    ActivityTryUsersModule,
    ActivityTriesModule,
    TenancyConfigModule,
    ThemesModule,
    LessonTryUsersModule,
    LessonCommentsModule,
    LessonCommentReactionsModule,
    TenancyOauth2CredentialsModule,
    PointReasonsModule,
    PointReasonsValueModule,
    PointsUserLogModule,
    IntegrationTypesModule,
    ProgramCoursesStatusModule,
    CourseLessonsModule,
    LessonPermissionTypesModule,
    CollectionTypesModule,
    PaymentStatusModule,
    PaymentsModule,
    ProgramPaymentModule,
    UsersOrganizationsModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
