import { Inject, Injectable } from '@nestjs/common';
import {
  CreateActivityCompleteTextsDto,
  UpdateActivityCompleteTextsDto,
  ACTIVITY_COMPLETE_TEXTS_PROVIDER,
} from './activity_complete_texts.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ActivityCompleteTexts } from './activity_complete_texts.entity';
import { UpdateUsersDto } from '../acl/users/users.dto';
import { UpdateResult } from 'typeorm';
import * as shortid from 'shortid';
import { typeFilesAwsNames } from '../../aws/aws.dto';
import { AwsService } from '../../aws/aws.service';

@Injectable()
export class ActivityCompleteTextsService extends BaseService<
  ActivityCompleteTexts,
  CreateActivityCompleteTextsDto,
  UpdateActivityCompleteTextsDto
> {
  @Inject(ACTIVITY_COMPLETE_TEXTS_PROVIDER)
  repository: BaseRepo<ActivityCompleteTexts>;

  constructor(private awsService: AwsService) {
    super();
  }

  async update(
    id: number,
    updateDto: UpdateActivityCompleteTextsDto,
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
      type: typeFilesAwsNames.activity_complete_text,
    });
    return result.Key;
  }

  async isRight(detail_id: number, answer: string[]): Promise<boolean> {
    let right = false;
    let matchs = 0;
    const question = await this.findOne(detail_id);
    const listAllWords = question.text.split(' ');
    let pos = 0;
    for (const word of listAllWords) {
      if (word.length > 1) {
        if (word[0] === '#') {
          const wordCorrect = word.replace('#', '');
          if (wordCorrect == answer[pos]) {
            matchs++;
          }
          pos++;
        }
      }
    }
    if (matchs == pos) {
      right = true;
    }
    return right;
  }
}
