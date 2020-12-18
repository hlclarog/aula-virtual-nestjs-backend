import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/filters/http-exception.filter';
import { TransformInterceptor } from './utils/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // SWAGER CONFIG
  const options = new DocumentBuilder()
    .setTitle('MANGUS API')
    .setDescription('The mangus app API REST documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document, {});

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
