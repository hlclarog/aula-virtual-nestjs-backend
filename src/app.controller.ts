import { Controller, Get, Post } from '@nestjs/common';
import { EMAIL_BUY_COURSE } from './api/email_activities/email_activities_actions.dto';
import { AppService } from './app.service';
import { EmailManagerService } from './email/email-manager.service';
import { generateFile } from './utils/pdfmake/pdfmake.generator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private emailService: EmailManagerService,
  ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('generatepdf')
  async generateFilepdf() {
    const result = await generateFile(
      {
        content: [
          'First paragraph',
          'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
        ],
      },
      {},
    );
    return { data: result };
  }

  @Post('test-email')
  async sendEmail() {
    const info: EMAIL_BUY_COURSE = {
      STUDENT_NAME: 'Mathiws',
      COURSE_NAME: 'JS',
    };
    const result = await this.emailService.sendEmailFromActivity({
      user_id: 2,
      email_activity_id: 1,
      alias: 'cua',
      data: info,
    });
    return { data: result };
  }
}
