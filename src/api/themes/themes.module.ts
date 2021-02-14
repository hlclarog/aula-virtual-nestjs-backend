import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { THEMES_PROVIDER } from './themes.dto';
import { Themes } from './themes.entity';
import { AwsModule } from './../../aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [ThemesController],
  providers: [
    {
      provide: THEMES_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) => connection.getRepository(Themes),
    },
    ThemesService,
  ],
})
export class ThemesModule {}
