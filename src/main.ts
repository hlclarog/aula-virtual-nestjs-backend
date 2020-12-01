import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // SWAGER CONFIG
  const options = new DocumentBuilder()
    .setTitle('MANGUS API')
    .setDescription('The mangus app API REST documentation')
    .setVersion('1.0')
    .addTag('test')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-mangus-client',
        in: 'header',
      },
      'x-mangus-client',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, {});

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3010);
}
bootstrap();
