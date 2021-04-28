import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { generateFile } from './utils/pdfmake/pdfmake.generator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
}
