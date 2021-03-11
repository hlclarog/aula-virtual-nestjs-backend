import { Body, Get, Put } from '@nestjs/common';
import { PointReasonsValueService } from './point_reasons_value.service';
import { SetPointReasonsValueDto } from './point_reasons_value.dto';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'point_reasons_value' })
export class PointReasonsValueController {
  constructor(private point_reasons_valueService: PointReasonsValueService) {}

  @Get()
  async fetch() {
    const reuslt = await this.point_reasons_valueService.find();
    return { data: reuslt ? reuslt : {} };
  }
  @Put('')
  async edit(@Body() updateDto: SetPointReasonsValueDto) {
    const reuslt = await this.point_reasons_valueService.update(updateDto);
    return { data: reuslt };
  }
}
