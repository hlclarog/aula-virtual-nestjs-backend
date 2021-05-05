import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Tenancies } from './../api/tenancies/tenancies.entity';
import { DatabaseManualService } from './../database/database-manual.service';
import {
  DATABASE_MANAGER_PROVIDER,
  NO_FOUND_CLIENT,
} from './../database/database.dto';
import { Connection } from 'typeorm';
import { OptionsEmailFromActivity } from './email.dto';
import { EMAIL_ACTIVITIES_ENTITY } from './../api/email_activities/email_activities.dto';
import { Users } from './../api/acl/users/users.entity';
import { EmailService } from './email.service';
import { TenancyEmails } from './../api/tenancy_emails/tenancy_emails.entity';
import { EmailActivitiesTemplate } from './../api/email_activities_template/email_activities_template.entity';
import * as Handlebars from 'handlebars';

@Injectable()
export class EmailManagerService {
  @Inject(DATABASE_MANAGER_PROVIDER) private connectionManager: Connection;

  constructor(
    private databaseManualService: DatabaseManualService,
    private emailService: EmailService,
  ) {}

  async sendEmailFromActivity(options: OptionsEmailFromActivity) {
    let connection: Connection = null;
    const tenancy: Tenancies = await this.connectionManager
      .getRepository(Tenancies)
      .findOne({
        where: { alias: options.alias },
      });
    if (tenancy.id) {
      connection = await this.databaseManualService.getConnection(
        tenancy.schema,
      );
      const user: Users = await connection.getRepository(Users).findOne({
        where: { id: options.user_id },
      });
      const dataTemplateActivity: any = await connection
        .getRepository(EMAIL_ACTIVITIES_ENTITY)
        .createQueryBuilder('email_activity')
        .select([
          'email_activity.id',
          'email_activity.description',
          'email_activities_template.id',
          'email_activities_template.email_template_id',
          'email_activities_template.email_activity_id',
          'email_activities_template.subject',
          'email_activities_template.body',
          'email_template.id',
          'email_template.description',
          'email_template.language_id',
        ])
        .leftJoin(
          'email_activity.email_activities_template',
          'email_activities_template',
          'email_activities_template.email_activity_id = :email_activity_id',
          {
            email_activity_id: options.email_activity_id,
          },
        )
        .innerJoinAndSelect(
          'email_activities_template.tenancy_email',
          'tenancy_email',
        )
        .innerJoin(
          'email_activities_template.email_template',
          'email_template',
          'email_template.active = true AND email_template.language_id = :language_id',
          { language_id: user.language_id },
        )
        .where('email_activity.id = :email_activity_id', {
          email_activity_id: options.email_activity_id,
        })
        .getOne();
      if (dataTemplateActivity) {
        const activity_template: EmailActivitiesTemplate =
          dataTemplateActivity.email_activities_template[0];
        const data_email: TenancyEmails = activity_template.tenancy_email;
        const subject = Handlebars.compile(activity_template.subject);
        const body = Handlebars.compile(activity_template.body);
        this.emailService.sendMail(
          {
            host: data_email.hostname,
            port: data_email.port_number,
            user: data_email.username,
            pass: data_email.password,
          },
          {
            to: user.email,
            from: data_email.email_name,
            subject: subject(options.data),
            html: body(options.data),
          },
        );
        return dataTemplateActivity;
      } else {
        throw new BadRequestException({
          message: 'This config not complete to send email',
        });
      }
    } else {
      throw new BadRequestException({
        message: NO_FOUND_CLIENT,
      });
    }
  }
}
