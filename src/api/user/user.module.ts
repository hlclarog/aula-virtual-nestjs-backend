import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DATABASE_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { USER_PROVIDER } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: USER_PROVIDER,
      inject: [DATABASE_PROVIDER],
      useFactory: (connection: Connection) => connection.getRepository(User),
    },
    UserService,
  ],
})
export class UserModule {}
