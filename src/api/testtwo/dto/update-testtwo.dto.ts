import { PartialType } from '@nestjs/mapped-types';
import { CreateTesttwoDto } from './create-testtwo.dto';

export class UpdateTesttwoDto extends PartialType(CreateTesttwoDto) {}
