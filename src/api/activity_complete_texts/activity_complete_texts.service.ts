import { Inject, Injectable } from '@nestjs/common';
import {
  CreateActivityCompleteTextsDto,
  UpdateActivityCompleteTextsDto,
  ACTIVITY_COMPLETE_TEXTS_PROVIDER,
} from './activity_complete_texts.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ActivityCompleteTexts } from './activity_complete_texts.entity';

@Injectable()
export class ActivityCompleteTextsService extends BaseService<
  ActivityCompleteTexts,
  CreateActivityCompleteTextsDto,
  UpdateActivityCompleteTextsDto
> {
  @Inject(ACTIVITY_COMPLETE_TEXTS_PROVIDER)
  repository: BaseRepo<ActivityCompleteTexts>;

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
