import { Body, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateTestDto, TEST_PERMISSIONS, UpdateTestDto } from './test.dto';
import { TestService } from './test.service';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { PermissionsGuard } from '../../utils/guards/permissions.guard';
import { RequirePermissions } from '../../utils/decorators/permissions.decorator';

@UseGuards(PermissionsGuard)
@ControllerApi({ name: 'test' })
export class TestController {
  constructor(private testService: TestService) {}

  @Get()
  public async get() {
    const result = await this.testService.findAll();
    return { data: result };
  }

  @Post()
  @RequirePermissions([TEST_PERMISSIONS.CREATE])
  public async save(@Body() test: CreateTestDto) {
    const result = await this.testService.create(test);
    return { data: result };
  }

  @Put('/:id')
  @RequirePermissions([TEST_PERMISSIONS.UPDATE])
  public async update(@Param('id') id: number, @Body() test: UpdateTestDto) {
    const result = await this.testService.update(id, test);
    return { data: result };
  }

  @Delete('/:id')
  @RequirePermissions([TEST_PERMISSIONS.DELETE])
  public async delete(@Param('id') id: number) {
    const result = await this.testService.delete(id);
    return { data: result };
  }
}
