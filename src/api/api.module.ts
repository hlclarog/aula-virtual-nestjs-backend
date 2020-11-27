import { Module, Global } from '@nestjs/common';
import { TestModule } from './test/test.module';

@Module({
    imports: [
        TestModule
    ],
    controllers: [],
    providers: [],
})
export class ApiModule {};