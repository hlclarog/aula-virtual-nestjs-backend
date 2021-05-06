import { Module, Global } from '@nestjs/common';
import { EmailManagerService } from './email-manager.service';
import { EmailService } from './email.service';

@Global()
@Module({
  providers: [EmailService, EmailManagerService],
  exports: [EmailService, EmailManagerService],
})
export class EmailModule {}
