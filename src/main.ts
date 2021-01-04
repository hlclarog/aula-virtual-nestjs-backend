import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { HttpExceptionFilter } from './utils/filters/http-exception.filter';
import { TransformInterceptor } from './utils/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // SWAGER CONFIG Se configura ruta para Swager
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

  const configService = app.get(ConfigService);

  await app.listen(configService.portApi());
}
bootstrap();
