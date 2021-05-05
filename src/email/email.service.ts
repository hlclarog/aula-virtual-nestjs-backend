import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailProviderCofig, EmailContent } from './email.dto';

@Injectable()
export class EmailService {
  constructor() {}

  private transport(provider: EmailProviderCofig) {
    return nodemailer.createTransport({
      host: provider.host,
      port: provider.port,
      auth: {
        user: provider.user,
        pass: provider.pass,
      },
    });
  }

  async sendMail(provider: EmailProviderCofig, content: EmailContent) {
    await this.transport(provider).sendMail(content);
  }
}

// host: 'smtp.office365.com',
// port: 587,
// auth: {
//   user: 'juniorbq24@outlook.com',
//   pass: 'Jun10r2021',
// },

// to: toEmail,
// from: '"Fred Foo 👻" <juniorbq24@outlook.com>',
// subject: 'Hello ✔',
// text: 'Hello world?',
// html: '<b>Hello world?</b>'
