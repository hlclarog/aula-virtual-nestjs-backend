import { Controller, Get, Inject } from '@nestjs/common';
import { Connection } from 'typeorm';
import { AppService } from './app.service';
import { TENANCY_PROVIDER } from './database/database.dto';

@Controller()
export class AppController {
  @Inject(TENANCY_PROVIDER) connection: Connection;

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/run_migrations')
  async runMigrations() {
    await this.connection.runMigrations();
    return { data: 'Migrations runing' };
  }
}
