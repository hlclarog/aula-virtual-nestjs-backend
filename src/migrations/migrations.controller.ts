import { Controller, Get, Inject } from '@nestjs/common';
import { DATABASE_TENANCY_PROVIDER } from '../database/database.dto';
import { Connection } from 'typeorm';

@Controller('migrations')
export class MigrationsController {
  @Inject(DATABASE_TENANCY_PROVIDER) connection: Connection;

  constructor() {}

  @Get('run')
  async run() {
    await this.connection.runMigrations();
    return { data: 'Migrations runing' };
  }
}
