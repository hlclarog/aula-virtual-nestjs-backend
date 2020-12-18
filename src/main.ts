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
    .setVersion('1.0')
    .addTag('test')
    .addTag('languages')
    .addTag('identification_types')
    .addTag('tenancy_status')
    .addTag('email_activities')
    .addTag('email_activities_template')
    .addTag('email_templates')
    .addTag('clients')
    .addTag('tenancies')
    .addTag('tenancy_domains')
    .addTag('tenancy_emails')
    .addTag('tenancy_languages')
    .addTag('users')
    .addTag('auth')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-mangus-client',
        in: 'header',
      },
      'x-mangus-client',
    )
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document, {});

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
