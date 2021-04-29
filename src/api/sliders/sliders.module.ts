import { Module } from '@nestjs/common';
import { SlidersService } from './sliders.service';
import { SlidersController } from './sliders.controller';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { SLIDERS_PROVIDER } from './sliders.dto';
import { Sliders } from './sliders.entity';
import { AwsModule } from '../../aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [SlidersController],
  providers: [
    {
      provide: SLIDERS_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(Sliders),
    },
    SlidersService,
  ],
})
export class SlidersModule {}
