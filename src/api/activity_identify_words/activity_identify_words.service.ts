import { Inject, Injectable } from '@nestjs/common';
import {
  CreateActivityIdentifyWordsDto,
  UpdateActivityIdentifyWordsDto,
  ACTIVITY_IDENTIFY_WORDS_PROVIDER,
} from './activity_identify_words.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ActivityIdentifyWords } from './activity_identify_words.entity';
import { AwsService } from '../../aws/aws.service';
import { UpdateResult } from 'typeorm';
import * as shortid from 'shortid';
import { typeFilesAwsNames } from '../../aws/aws.dto';

@Injectable()
export class ActivityIdentifyWordsService extends BaseService<
  ActivityIdentifyWords,
  CreateActivityIdentifyWordsDto,
  UpdateActivityIdentifyWordsDto
> {
  @Inject(ACTIVITY_IDENTIFY_WORDS_PROVIDER)
  repository: BaseRepo<ActivityIdentifyWords>;

  constructor(private awsService: AwsService) {
    super();
  }

  async update(
    id: number,
    updateDto: UpdateActivityIdentifyWordsDto,
  ): Promise<UpdateResult> {
    if (updateDto.resource_content) {
      updateDto.resource_content = await this.setResourceContent(
        updateDto.resource_content,
      );
    }
    return await this.repository.update(id, updateDto);
  }

  async setResourceContent(file) {
    const result = await this.awsService.saveFile({
      file,
      name: shortid.generate(),
      type: typeFilesAwsNames.activity_identify_word,
    });
    return result.Key;
  }

  async isRight(detail_id: number, answer: string): Promise<boolean> {
    const question = await this.findOne(detail_id);
    return question.word === answer;
  }

  async getByDetailId(detail_id: number) {
    return await this.repository
      .createQueryBuilder('activity')
      .select([
        'activity.id',
        'activity.statement',
        'activity.observation',
        'activity.word',
        'activity.picture',
        'activity.video',
        'activity.audio',
        'activity.resource_content',
        'activity.resource_type_id',
      ])
      .where('activity.id = :detail_id', {
        detail_id,
      })
      .getOne();
  }
}
