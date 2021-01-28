import { AwsService } from './../../aws/aws.service';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';
import { Courses } from './courses.entity';
import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_TENANCY_PROVIDER } from './../../database/database.dto';

@Injectable()
@EventSubscriber()
export class CoursesSubscriber implements EntitySubscriberInterface<Courses> {
  constructor(
    @Inject(DATABASE_TENANCY_PROVIDER) connection: Connection,
    private awsService: AwsService,
  ) {
    connection.subscribers.push(this);
  }
  listenTo() {
    return Courses;
  }
  afterLoad(entity: Courses) {
    console.log(entity);
    // if (entity) entity.picture = await this.awsService.getFile(entity.picture);
  }
}
