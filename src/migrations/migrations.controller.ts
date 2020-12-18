import { Get, Inject } from '@nestjs/common';
import { DATABASE_TENANCY_PROVIDER } from '../database/database.dto';
import { Connection } from 'typeorm';
import { ControllerMigrations } from './../utils/decorators/controllers.decorator';

@ControllerMigrations({ name: '' })
export class MigrationsController {
  @Inject(DATABASE_TENANCY_PROVIDER) connection: Connection;

  constructor() {}

  @Get('run')
  async run() {
    await this.connection.runMigrations();
    return { message: 'Migrations runing' };
  }

  @Get('verify')
  async verify() {
    return { data: await this.connection.showMigrations() };
  }
}
